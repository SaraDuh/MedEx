var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);
// get argument url
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

var root = firebase.database().ref().child("users");
var MRNurl = getURLpara("MRN");
root.on("child_added", snap => {
  // var role = snap.child("Role").val();
  var MRN = snap.child("MRN").val();
  if (MRN == MRNurl) {
  var Name = snap.child("Name").val();
  var Address = snap.child("Address").val();
  var Age = snap.child("Age").val();
  var MH = snap.child("Medical History").val();
  var PhoneNo = snap.child("PhoneNo").val();
  var Gender = snap.child("Gender").val();

  var HTMLtxt = '<h3> Medical Record Number: </h3> <h4>'+MRN+
  '</h4><h3> Age </h3> <h4>'+Age+'</h4><h3> Gender </h3> <h4>'+Gender+
  '</h4><h3> Medical History </h3> <h4>'+MH+'</h4><h3> Phone Number </h3> <h4>'
  +PhoneNo+'</h4><h3> Address </h3><h4>'+Address+'</h4>';

   $("#profileDiv").append(HTMLtxt);
   $("#name").append(Name);
 }
});

function getMRN(){
  console.log(MRNurl);
   document.getElementById("a").href="Prescription/AddPrescriptionForm.html?MRN="+MRNurl;
}

// $("#body").ready(function(){
//   alert(getURLpara("MRN"));
// });
