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
const promise = auth.signInWithEmailAndPassword(email, password);
promise.catch(e => console.log(e.message));


});

//sign up function
btnSignUp.addEventListener('click', e => {
//get email and password
const email = txtEmail.value;
const password = txtPass.value;
const auth = firebase.auth();

// sign in
const promise = auth.createUserWithEmailAndPassword(email, password);
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
