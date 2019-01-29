var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("btnLogOut").style.display = "block";


    var user = firebase.auth().currentUser;

    if(user != null){

      // var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

      //console.log(firebaseUser);
      console.log("user logged in");
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
}




function login(){




  var txtEmail = document.getElementById('email').value;
  var txtPass = document.getElementById('password').value;

console.log(txtEmail+" "+txtPass+" 1234");
  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
console.log("user logged in");

    window.alert("Error : " + errorMessage);

    // ...
  });

};
