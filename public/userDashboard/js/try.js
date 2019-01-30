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
    //window.location = '/userDashboard/dashboard.html';
    if(user != null){

      // var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

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
}


// $(document).ready(function(){
//   $("#btnLogout").click(function(){
//     $("#logoutDiv").hide();
//   });
//   // $("#show").click(function(){
//   //   $("p").show();
//   // });
// }
// );


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
  // display logout button on successful log in
// if(errorMessage != null){
//
// }


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
