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
var PhoneNo, area, Name, email;

root.on("child_added", snap => {
  // var role = snap.child("Role").val();
  var phone = snap.child("PhoneNo").val();
  if (phone == PhoneUrl) {
   Name = snap.child("Name").val();
  console.log(Name);
   area = snap.child("DeliveryArea").val();
   email = snap.child("Email").val();
  //var MH = snap.child("Medical History").val();
   PhoneNo = snap.child("PhoneNo").val();
  //var Gender = snap.child("Gender").val();

$("#fName").val(Name);
$("#email").val(email);
$("#phone").val(PhoneNo);
$("#area_selected").val(area);
 }
});


$("#btnEdit").click(function(){
var driverRef;
root.orderByChild("PhoneNo").equalTo(PhoneNo).on("child_added", function(snap){
driverRef = snap;
});
console.log(driverRef.key);

var DriverRoot = firebase.database().ref().child("users").child(driverRef.key);

// check before update

var Validaty = true;
var input = $('.validate-input .input100');
var email = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

  for(var i=0; i<input.length; i++) {
    if($(input[i]).attr('name') == 'email') {
      if($(input[i]).val().trim().match(email) == null) {
        Validaty = false; }
      }
    else if($(input[i]).attr('name') == 'phone') {
      if($(input[i]).val().trim().match(/^[0-9]{12}$/) == null) {
        Validaty = false; }
    }
    else if($(input[i]).attr('name') == 'name' ) {
      if($(input[i]).val().trim().match(/^[a-zA-Z ]{1,20}$/) == null) {
        Validaty = false; }
    }
 } // for loop
 // check dropDownMenu for Delivery Area
 var dropDownMenu = document.getElementById("area_selected");
 var slectedArea = dropDownMenu.options[dropDownMenu.selectedIndex].value;
 console.log(slectedArea);
 if (slectedArea == "") Validaty = false; // check dropDownMenu

 //|| $(input[i]).attr('name') == 'area'
console.log("Validaty: "+Validaty);



  if(Validaty) {
    var area = document.getElementById("area_selected");
    var textarea = area.options[area.selectedIndex].value;

DriverRoot.update({

  DeliveryArea:textarea,
  Email:$('#email').val(),
  Name:$('#fName').val(),
  PhoneNo: $('#phone').val()

});

window.location="../../userDashboard/AdminDashboard.html";
}// if Validaty
else {
  window.alert("Invalid Input \nPlease fill all the required fields with a valid information"); }


});

$(document).ready(function(){
  $("#btnEdit").click(function(event){
    event.preventDefault();
  });
});
