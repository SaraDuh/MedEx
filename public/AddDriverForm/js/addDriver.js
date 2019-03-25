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
    window.location = 'Login_v2/index.html';
    //If User is not logged in, redirect to login page
  }
});

//edit this later
var root = firebase.database().ref().child("users");

$('#btnAdd').click(function(){

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
      else if($(input[i]).attr('name') == 'fname' || $(input[i]).attr('name') == 'lname' || $(input[i]).attr('name') == 'area' ) {
        if($(input[i]).val().trim().match(/^[a-zA-Z, ]{1,20}$/) == null) {
          Validaty = false; }
      }

   } // for loop
console.log("Validaty: "+Validaty);

if(Validaty) {

var area = document.getElementById("area_selected");
var textarea = area.options[area.selectedIndex].value;
console.log(textarea);
// function castvote() {
//     var mySelect = document.getElementById("vote");
//     alert(mySelect.options[mySelect.selectedIndex].value);
// }




var name = $('#fName').val()+" "+$('#lName').val();
console.log(name);

root.push({
//$('#area').val()
  DeliveryArea:textarea,
  Email:$('#email').val(),
  Name: name,
  PhoneNo: $("#phone").val(),
  Role: "Driver"
  //yrefill:$('#yrefill').val(),

});

//TO DO: add second medication
// add another med (to the same) prescription
window.location = "/userDashboard/AdminDashboard.html";
}// if Validaty
else { window.alert("Invalid Input \nPlease fill all the required fields with a valid information"); }

});

$(document).ready(function(){
  $("#btnAdd").click(function(event){
    event.preventDefault();
  });
});
