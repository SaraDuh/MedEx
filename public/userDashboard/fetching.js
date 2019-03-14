var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);

var webUsers = firebase.database().ref().child("webUsers");
var Rol;
firebase.auth().onAuthStateChanged(user => {
  if(!user) { //If User is not logged in, redirect to login page
    window.location = '/Login_v2/index.html'; }
    webUsers.once("value",function(snap) {
      Rol = snap.child(user.uid).child("Role").val();
      // console.log("Rol   "+Rol);
      if (Rol != "Physician") {
        if (Rol=="Pharmacist") window.location = 'pharmDashboard.html';
         else if (Rol=="Admin") window.location = 'AdminDashboard.html'; }
    });
});

function logout(){

  firebase.auth().signOut();
  console.log("user logged out");
  window.location = '/Login_v2/index.html';
}



var root = firebase.database().ref().child("users");
var counter = 0;




root.on("child_added", snap => {
  var role = snap.child("Role").val();
  if (role=="Patient") {
    counter++;
  var MRN = snap.child("MRN").val();
  var Name = snap.child("Name").val();
  var Gender = snap.child("Gender").val();
  var HTMLtxt = '<tr><td class="serial">'+counter+'.</td><td id="MRN'+counter+'">'+MRN+'</td><td><span class="name">'
  +Name+'</span></td><td><span class="product">'+Gender+'</span></td><td><a href="/patientProfile.html?MRN='+MRN
  +'"><span style="background: #00B2F4" class="badge badge-complete">Patient Profile</span></a></td></tr>';

   $("#tableBody").append(HTMLtxt);
 }
});
