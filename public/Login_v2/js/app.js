(function() {

// getting elements

const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');

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
// add realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
    console.log("user logged in");
  }else{
    console.log("not logged in");
  }
});

}());
