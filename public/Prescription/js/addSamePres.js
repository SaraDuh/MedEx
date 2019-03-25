// this documents adds the medicine to the already created prescription node MD2, MD3...
var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = '/Login_v2/index.html';
    //If User is not logged in, redirect to login page
  }
});


var ROLE;
  firebase.auth().onAuthStateChanged(function(user) {
  if(user != null){
    var root = firebase.database().ref().child("webUsers");
    root.once("value",function(snap) {
        ROLE = snap.child(user.uid).child("Role").val();
console.log("ROLE: "+ROLE);


var getURLpara = function getUrlParameter(sParam){
var pageURL = decodeURIComponent(window.location.search.substring(1)),
URLvars = pageURL.split('&'),
parameterName,
i;
for (i=0; i < URLvars.length; i++){
  parameterName = URLvars[i].split('=');
  if(parameterName[0] === sParam){
    return parameterName[1] === undefined ? true : parameterName[1]; }
}}

var MRNurl = getURLpara("MRN");
var RxUrl = getURLpara("Rx");
console.log(MRNurl);
console.log(RxUrl);


// fetching
var root = firebase.database().ref().child("users");
var counter = 0;

// retrieve from the database the number of prescriptions available so we know what is the number to add on


var yes;
var parent;
var foundpreskey;
root.on("value", getData, errData);

function getData(data){

var nodeKeys = data.val();

var keys = Object.keys(nodeKeys);
//console.log("here comes the nodes");
//console.log(nodeKeys);
//console.log(keys);

for(var i=0; i<keys.length; i++){
  var k = keys[i];
  var pres;

  if( ROLE=="Physician") {
     pres = nodeKeys[k].Prescriptions;}
  else if (ROLE=="Pharmacist") {
     pres = nodeKeys[k].Orders; }



  var mrn = nodeKeys[k].MRN;
  if(mrn == MRNurl){
    //console.log(getNumOfPrescription(pres));
    //console.log(mrn);
    //console.log(mrn);

    if( ROLE=="Physician") {
     foundpreskey = root.child(keys[i]).child("Prescriptions"); }
    else if (ROLE=="Pharmacist") {
     foundpreskey = root.child(keys[i]).child("Orders"); }

    // foundpreskey = root.child(keys[i]).child("Prescriptions");
    console.log(keys[i]);

 //yes = firebase.database().ref().child(foundpreskey.key);
 //parent = foundpreskey.parent.key;
 parent= keys[i];
 console.log(parent);
 foundpreskey = foundpreskey.key;
 console.log(foundpreskey);
 counter = getNumOfPrescription(pres);
 console.log(counter);
  }

}

};


function errData(err){

console.log("Error!");
console.log(err);

};

function getNumOfPrescription(pres){
  return Object.keys(pres).length;

};


$("#yrefill").click(function(){ $('#refillDiv').show();
$("#date").attr("required", "true"); });
$("#nrefill").click(function(){ $('#refillDiv').hide();
$("#date").attr("required", "false"); });

$('#btnAdd').click(function(){
// find the user by their mrn


  var pref;
  if( ROLE=="Physician") {
    pref = root.child(parent+"/"+foundpreskey+"/PR"+(counter));
  }
  else if (ROLE=="Pharmacist") {
    // pref = root.child(parent+"/"+foundpreskey";
    pref = root.child(parent+"/"+foundpreskey+"/"+RxUrl); // instead of ORD put Rx
  }
  // = root.child(parent+"/"+foundpreskey+"/PR"+(counter));
  console.log(pref.key);


var Validaty = true;
var input = $('.validate-input .input100');
for(var i=0; i<input.length; i++) {

 if($(input[i]).attr('name') == 'email') {
   if($(input[i]).val().trim().match(/^[a-zA-Z_, ]{1,20}$/) == null) {
     Validaty = false; } // if contrains other than chars
   if($(input[i]).val().trim() == ''){ Validaty = false; } //if empty fields
   } // if the input is medicine Name validatable fields

 else if($(input[i]).attr('name') == 'doze' || $(input[i]).attr('name') == 'frequency' || $(input[i]).attr('name') == 'Quantity') {
        if($(input[i]).val().trim().match(/^[a-zA-Z0-9, ]{1,20}$/) == null) { Validaty = false; } // if contrains other than chars and numbers
        if($(input[i]).val().trim() == null){ Validaty = false; } //if empty fields
   } // if the input is one of the 3 validatable fields

 else if ($(input[i]).attr('id') == 'yrefill'){ // if input is yes radio refill btn
   if( $("#yrefill").is(':checked') ) { // if it has refill but has no date
     if($("#date").val().trim() == ""){ Validaty = false; } //if empty date
   }
 } // if input is yes radio refill btn

} // for loop
console.log("Validaty: "+Validaty);



  if(Validaty) {

  if( ROLE=="Physician") {
pref.push({
  Name:$('#mdName').val(),
  Doze:$('#doze').val(),
  Frequency:$('#frequency').val(),
  Quantity:$('#Quantity').val(),
  RelatedDetails: $('#dets').val(),
  Refill: $("input[name='refill']:checked").val(),
  nextRefillDate: $('#date').val()
  //yrefill:$('#yrefill').val(),

}); }

else if (ROLE=="Pharmacist") {
  var satPrice = prompt("Please set a Price for the approval medicine!");
  while (satPrice==null || satPrice.trim()=="" || satPrice.trim().match(/^[0-9]*$/) == null) {
    window.alert("Please set a valid Price or 0 for free indication");
    satPrice = prompt("Please you must to set a Price for the approval medicine!");}


  pref.push({
    Name:$('#mdName').val(),
    Doze:$('#doze').val(),
    Frequency:$('#frequency').val(),
    Quantitiy:$('#Quantity').val(),
    RelatedDetails: $('#dets').val(),
    NextRefillDate: $('#date').val(),
    MRN: MRNurl,
    OrderStatus: "Approved",
    Price: satPrice
  });
  var PresOrdRef = firebase.database().ref().child("Prescription Orders").child(RxUrl);

  PresOrdRef.push({
    Name:$('#mdName').val(),
    Doze:$('#doze').val(),
    Frequency:$('#frequency').val(),
    Quantitiy:$('#Quantity').val(),
    RelatedDetails: $('#dets').val(),
    NextRefillDate: $('#date').val(),
    MRN: MRNurl,
    OrderStatus: "Approved",
    Price: satPrice
  });
}




//TO DO: add second medication
// add another med (to the same) prescription
window.location = "anotherMed.html?MRN="+MRNurl+"&Rx="+RxUrl;

}// if Validaty
else { window.alert("Invalid Input \n Please fill all the required fields with a valid information"); }

}); // $(btn).cick

}); //     root.once("value",function(snap)
} //   if(user != null)
}); // onAuthStateChanged
