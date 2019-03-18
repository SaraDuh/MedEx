// this document creates a new prescription node and adds
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
//edit this later
var ROLE, physName;
  firebase.auth().onAuthStateChanged(function(user) {
  if(user != null){
    var root = firebase.database().ref().child("webUsers");
    root.once("value",function(snap) {
        ROLE = snap.child(user.uid).child("Role").val();
        // physName = snap.child(user.uid).child("Name").val();

// console.log("Name: "+physName);
console.log("ROLE: "+ROLE);

      physName = snap.child(firebase.auth().currentUser.uid).child("Name").val();
//       console.log("physName");
      console.log(physName);
//     });



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
console.log("RX: "+RxUrl);



// fetching
var root = firebase.database().ref().child("users");
var counter = 0;

// retrieve from the database the number of prescriptions available so we know what is the number to add on
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

function getTodaysDate(){
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;
//document.write(today);
return today;
};


$("#yrefill").click(function(){ $('#refillDiv').show(); });
$("#nrefill").click(function(){ $('#refillDiv').hide(); });

$('#btnAdd').click(function(){
// if inputs has validatation classes then btn disable

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
  var rxstring = Math.floor((Math.random() * 1000000) + 1);
    //console.log(rxstring);
    rxstring= String(rxstring);


    var pref;
    if( ROLE=="Physician") {
      pref = root.child(parent+"/"+"Prescriptions/PR"+(counter+1));
    }
    else if (ROLE=="Pharmacist") {
       // pref = root.child(parent+"/"+"Orders/";
       // pref = root.child(parent+"/"+"Orders/ORD"+(counter+1));
       pref = root.child(parent+"/"+foundpreskey+"/"+RxUrl); // instead of ORD put Rx
     }

  //console.log(pref);
  pref.set({
    RX: rxstring,
    PrescriptionDate: getTodaysDate(),
    PrescribedPhysician: physName
    // ++++ TO DO : add prescribing physcian
  });

pref.push({
  Name:$('#mdName').val(),
  Dose:$('#doze').val(),
  Frequency:$('#frequency').val(),
  Quantity:$('#Quantity').val(),
  RelatedDetails: $('#dets').val(),
  Refill: $("input[name='refill']:checked").val(),
  nextRefillDate: $('#date').val()
  //yrefill:$('#yrefill').val(),

});

  //TO DO: add second medication
  // add another med (to the same) prescription
  window.location = "anotherMed.html?MRN="+MRNurl+"&Rx="+RxUrl;
  console.log(MRNurl);
} // if Validaty true
// else { window.location = "AddPrescriptionForm.html?MRN="+MRNurl; } // reload
else { window.alert("Invalid Input \n Please fill all the required fields with a valid information"); }

}); // $(btn).cick

}); //     root.once("value",function(snap)
} //   if(user != null)
}); // onAuthStateChanged
