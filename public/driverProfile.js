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
var PhoneUrl = getURLpara("PhoneNo");
root.on("child_added", snap => {
  // var role = snap.child("Role").val();
  var phone = snap.child("PhoneNo").val();
  if (phone == PhoneUrl) {
  var Name = snap.child("Name").val();
  var area = snap.child("DeliveryArea").val();
  var email = snap.child("Email").val();
  //var MH = snap.child("Medical History").val();
  var PhoneNo = snap.child("PhoneNo").val();
  //var Gender = snap.child("Gender").val();

  var HTMLtxt = '<h3> Name: </h3> <h4>'+Name+
  '</h4><h3> Email </h3> <h4>'+email+'</h4><h3> Delivery Area </h3> <h4>'+area+
  '</h4><h3> Phone Number </h3> <h4>'+PhoneNo+'</h4><h3> Phone Number </h3> <h4>'
  +PhoneNo;

   $("#profileDiv").append(HTMLtxt);
   $("#name").append(Name);
 }
});

function getMRN(){
  console.log(PhoneUrl);
   document.getElementById("a").href="driverProfile.html?PhoneNo="+PhoneUrl;
}

// $("#body").ready(function(){
//   alert(getURLpara("MRN"));
// });
