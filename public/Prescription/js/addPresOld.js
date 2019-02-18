
var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);








// fetching
var root = firebase.database().ref().child("testusers");
var counter = 0;


// retrieve from the database the number of prescriptions available so we know what is the number to add on

root.on("child_added", snap => {
  //TO DO
  // patient mrn change this later to dynamic mrn

  var enteredmrn = "112233";
  var mrn = snap.child("MRN").val();
  // console.log(role);
  if (mrn==enteredmrn) {
    root.once("value",function(snap) {
        //console.log(snap.val());

//           role = snap.child("Prescriptions").val();
// console.log(role);
          counter++;
          console.log(counter);
      });
 }
 else {
snap.m
 }
});

// adding new prescription based on previous mrn number

$('#btnAdd').click(function(){
  var root = firebase.database().ref("testusers");
    //TO DO

    // find the user by their mrn
  var pref = root.child("PR"+(counter+1));

pref.push({
  mdName:$('#mdName').val(),
  doze:$('#doze').val(),
  frequency:$('#frequency').val(),
  Quantity:$('#Quantity').val(),
  dts: $('#dets').val(),
  Refill: $("input[name='refill']:checked").val(),
  nextRefillDate: $('#date').val()
  //yrefill:$('#yrefill').val(),

});

//TO DO: add second medication
window.location = "anotherMed.html";


});
