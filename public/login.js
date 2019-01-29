
  // <script src="https://www.gstatic.com/firebasejs/5.8.1/firebase.js"></script>
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
      authDomain: "medex-e6e1f.firebaseapp.com",
      databaseURL: "https://medex-e6e1f.firebaseio.com",
      projectId: "medex-e6e1f",
      storageBucket: "medex-e6e1f.appspot.com",
      messagingSenderId: "1006108228892"
    }
    firebase.initializeApp(config);

var userEmail = document.getElementById('email');
var userPass = document.getElementById('password');
var btnLogin = document.getElementById('btnLogin');
var btnLogOut = document.getElementById('btnLogOut');


function login() {
const auth = firebase.auth(); // window.alert(userEmail+"   "+userPass);
const promise = auth.signInWithEmailAndPassword(userEmail.value, userPass.value);

promise.catch(e => console.log(e.message));
}

function logout() {
firebase.auth().signOut(); }

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log("user logged in");
    console.log(firebaseUser);
    btnLogOut.style.color="blue";
  }else{
    console.log("not logged in");
    console.log(firebaseUser);
    btnLogOut.style.color="green";

  }
});
