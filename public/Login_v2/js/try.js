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
    // console.log(user.uid);
    if(user != null){
      var root = firebase.database().ref().child("webUsers");
      root.once("value",function(snap) {
          role = snap.child(user.uid).child("Role").val();
          if (role=="Physician") {
          window.location = '/userDashboard/dashboard.html';}
          else if (role=="Pharmacist") {
          window.location = '/userDashboard/pharmDashboard.html';}
          else if (role=="Admin") {
          window.location = '/userDashboard/AdminDashboard.html';}
      });
      console.log("user logged in");
      }else{
      console.log("not logged in");
      // window.location = '/index.html';

    }
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
  console.log(txtEmail+" "+txtPass);



  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {
    if ( (txtEmail===null) || (txtPass===null) ){
      window.alert("Please fill the required fields"); }
      console.log(txtEmail);
      console.log(txtPass);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("login error msg");
    window.alert("Error : " + errorMessage);
    //document.getElementById("logoutDiv").style.display = "none";
    // ...
  });

};
  function resetPassword(){
  var txtEmail = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(txtEmail).then(function(){
      alert('Password Reset Email has been sent!');
    }).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;

      if(errorCode == 'auth/invalid-email'){
        alert(errorMessage);
      }else if(errorCode == 'auth/user-not-found'){
        alert(errorMessage);
      }
      console.log(error);
    });
}
