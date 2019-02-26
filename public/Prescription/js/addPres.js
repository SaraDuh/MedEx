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
//edit this later



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
console.log(MRNurl);



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

  var pres = nodeKeys[k].Prescriptions;

  var mrn = nodeKeys[k].MRN;
  if(mrn == MRNurl){
    //console.log(getNumOfPrescription(pres));
    //console.log(mrn);
    //console.log(mrn);
    foundpreskey = root.child(keys[i]).child("Prescriptions");
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





$('#btnAdd').click(function(){


  var pref = root.child(parent+"/"+"Prescriptions/PR"+(counter+1));
  //console.log(pref);

pref.push({
  mdName:$('#mdName').val(),
  doze:$('#doze').val(),
  frequency:$('#frequency').val(),
  Quantity:$('#Quantity').val(),
  dts: $('#dets').val(),
  Refill: $("input[name='refill']:checked").val(),
  nextRefillDate: $('#date').val()
  //yrefill:$('#yrefill').val(),

});

//TO DO: add second medication
// add another med (to the same) prescription
window.location = "anotherMed.html?MRN="+MRNurl;
console.log(MRNurl);

});
