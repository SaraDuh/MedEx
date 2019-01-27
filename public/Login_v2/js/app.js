(function() {

  var config = {
    apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
    authDomain: "medex-e6e1f.firebaseapp.com",
    databaseURL: "https://medex-e6e1f.firebaseio.com",
    projectId: "medex-e6e1f",
    storageBucket: "medex-e6e1f.appspot.com",
    messagingSenderId: "1006108228892"
  };
  firebase.initializeApp(config);
// getting elements

const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogOut');
const btnSignUp = document.getElementById('btnSignUp');

// add login event
btnLogin.addEventListener('click', e => {
//get email and password
const email = txtEmail.value;
const password = txtPass.value;
const auth = firebase.auth();

// sign in
const promise = firebase.auth().signInWithEmailAndPassword("firebase.lamia@gmail.com", "123456789");
promise.catch(e => console.log(e.message));


});

//sign up function
btnSignUp.addEventListener('click', e => {
//get email and password
const email = txtEmail.value;
const password = txtPass.value;
const auth = firebase.auth();

// sign in
const promise = firebase.auth().createUserWithEmailAndPassword("firebase.lamia@gmail.com", "123456789");
promise.catch(e => console.log(e.message));


});


// add realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
    console.log("user logged in");
  }else{
    console.log("not logged in");
  }
});

btnLogout.addEventListener('click', e => {
firebase.auth().signOut();


});


}());
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//
//     document.getElementById("btnLogOut").style.display = "block";
//
//
//     var user = firebase.auth().currentUser;
//
//     if(user != null){
//
//       // var email_id = user.email;
//       // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
//
//       //console.log(firebaseUser);
//       console.log("user logged in");
//       }else{
//       console.log("not logged in");
//     }
//
//
//     // No user is signed in.
//
//     // document.getElementById("user_div").style.display = "none";
//     // document.getElementById("login_div").style.display = "block";
//
//   }
// });
//
//
// function logout(){
//
//   firebase.auth().signOut();
// }
//
// function login(){
//
//
//
//   var txtEmail = document.getElementById('email').value;
//   var txtPass = document.getElementById('password').value;
//
//
//   firebase.auth().signInWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//
//     window.alert("Error : " + errorMessage);
//
//     // ...
//   });

//}
