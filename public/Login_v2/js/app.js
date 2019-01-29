// (function() {
//
//   var config = {
//     apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
//     authDomain: "medex-e6e1f.firebaseapp.com",
//     databaseURL: "https://medex-e6e1f.firebaseio.com",
//     projectId: "medex-e6e1f",
//     storageBucket: "medex-e6e1f.appspot.com",
//     messagingSenderId: "1006108228892"
//   };
//   firebase.initializeApp(config);
// // getting elements
//
// const txtEmail = document.getElementById('email');
// const txtPass = document.getElementById('password');
// const btnLogin = document.getElementById('btnLogin');
// const btnLogout = document.getElementById('btnLogOut');
// const btnSignUp = document.getElementById('btnSignUp');
//
//
// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if(firebaseUser){
//     console.log("user logged in");
//     console.log(firebaseUser);
//   }else{
//     console.log("not logged in");
//     console.log(firebaseUser);
//   }
// });
//
// // add login event
// btnLogin.addEventListener('click', e => {
// //get email and password
// const email = txtEmail.value;
// const password = txtPass.value;
// const auth = firebase.auth();
//
// // sign in
// console.log(email+" .. "+password);
// const promise = firebase.auth().signInWithEmailAndPassword(email,password);
// // promise.then(user => console.log(user)).catch(e => console.log(e.message));
//
//
//
// });
//
// //sign up function
// // btnSignUp.addEventListener('click', e => {
// // //get email and password
// // const email = txtEmail.value;
// // const password = txtPass.value;
// // const auth = firebase.auth();
// //
// // // sign in
// // const promise = firebase.auth().createUserWithEmailAndPassword("s2@gmail.com", "123456");
// // promise.catch(e => console.log(e.message));
// //
// //
// // });
//
//
// // add realtime listener
//
// //
// // btnLogout.addEventListener('click', e => {
// // firebase.auth().signOut();
// //
// //
// // });
//
//
// }());
