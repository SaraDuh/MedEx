var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);

//document.getElementById("logoutDiv").style.display = "flex";
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    var role;
    console.log(user.uid);
    // console.log(user);
    if(user != null){
      var root = firebase.database().ref().child("webUsers");
      root.once("value",function(snap) {
        console.log(snap.val());
        // console.log(snap.child("Role").val());
          role = snap.child(user.uid).child("Role").val();
          // console.log(txtEmail);
          // console.log(snap.child("Email").val());
          if (role=="Physician") {
          window.location = '/userDashboard/dashboard.html';}
          else if (role=="Pharmacist") {
          window.location = '/userDashboard/PharmDashboard.html';}

      });
      // role = snap.child("Role").val();


      //console.log(firebaseUser);
      console.log("user logged in");
      //document.getElementById("logoutDiv").style.display = "flex";
      }else{
      console.log("not logged in");
    }


    // No user is signed in.

    // document.getElementById("user_div").style.display = "none";
    // document.getElementById("login_div").style.display = "block";

  }
});


function logout(){

  firebase.auth().signOut();
  console.log("user logged out");
  window.location = '/index.html';
}
function login(){

  var txtEmail = document.getElementById('email').value;
  var txtPass = document.getElementById('password').value;
  console.log(txtEmail+" "+txtPass+" 1234");

  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("login error msg");

    window.alert("Error : " + errorMessage);
    //document.getElementById("logoutDiv").style.display = "none";
    // ...
  });


};
