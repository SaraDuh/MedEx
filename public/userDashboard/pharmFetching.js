var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);

var webUsers = firebase.database().ref().child("webUsers");
var Rol;
firebase.auth().onAuthStateChanged(user => {
  if(!user) { //If User is not logged in, redirect to login page
    window.location = '/Login_v2/index.html'; }
    webUsers.once("value",function(snap) {
      Rol = snap.child(user.uid).child("Role").val();
      // console.log("Rol   "+Rol);
      if (Rol != "Pharmacist") {
        if (Rol=="Physician") window.location = 'dashboard.html';
         else if (Rol=="Admin") window.location = 'AdminDashboard.html'; }
    });
});



function logout(){

  firebase.auth().signOut();
  console.log("user logged out");
  window.location = '/Login_v2/index.html';
}

var root = firebase.database().ref().child("Prescription Orders");
// window.alert(root);

// var MRN,Status;
var orderedPres;
root.on("value", snap => {

var AllOrders = snap.val(); // json Object of all orders from firebase
 orderedPres = Object.keys(AllOrders); // array of all the orders
var numOfPres = Object.keys(AllOrders).length;
var HTMLtxt = "";
var counter = 1;
for(var i=0; i<numOfPres; i++){
  var numOfMeds = 0;
  var ref = root.child(orderedPres[i]);
  var MRN,Status;
  var arr = new Array();

ref.on("child_added", Med => {
  MRN = Med.child("MRN").val();
  arr[numOfMeds] = Med.child("OrderStatus").val();
  Status = Med.child("OrderStatus").val();
  numOfMeds++;
});
for(var l=1; l<arr.length; l++){ if (arr[l-1] != arr[l]) Status = arr[l-1]+"/"+arr[l];}

 HTMLtxt += '<tr id ="'+counter+'"><td class="serial">'+counter
 +'.</td><td><a style="color: black;" onclick="MedicalHistory('+counter+','+MRN+','+numOfPres+')">#'
 +MRN+'</a></td><td><span class="name">'+numOfMeds+'</span></td><td><span class="product">'
 +Status+'</span></td><td><a onclick="manageOrder('+counter+','+i+','+numOfPres+')"><button type="button" class="btn btn-primary btn-sm btn-outline-profile"><i class="fa fa-medkit"></i>&nbsp; Manage Orders</button></a></td></tr>';
counter++;

//style="background: #00B2F4; border-color: #00B2F4"
//<span style="background: #00B2F4" class="badge badge-complete">Manage Order</span>
// $("#tableBody").append(HTMLtxt);
document.getElementById("tableBody").innerHTML = HTMLtxt;
}

});


function manageOrder(rowID,indexOfOrder,numOfPres){
  // to hilight the specified row
  //hilightROW(rowID,numOfPres);

    // to display hidden div
var div = document.getElementById("orderDescription");
if (div.style.display==='block'){ div.style.display='none';}
if (div.style.display==='none'){ div.style.display='block';
document.getElementById("MedHistory").style.display='none';}


var reff = root.child(orderedPres[indexOfOrder]);
 var HtmlDetails;
 var hiddenBtn = 0;
 $("#MedBody").empty();
 reff.on("child_added", Med => {
   var Frequency,Dose,Name,NextRefillDate,Quantitiy,Details,MedStatus,MedMRN;

   Frequency = Med.child("Frequency").val();
   Dose = Med.child("Doze").val();
   Name = Med.child("Name").val();
   NextRefillDate = Med.child("NextRefillDate").val();
   Quantitiy = Med.child("Quantitiy").val();
   Details = Med.child("RelatedDetails").val();
   Status = Med.child("OrderStatus").val();
   MedMRN = Med.child("MRN").val();
   hiddenBtn++;


  HtmlDetails = '<tr><td class="serial">'+Name+'</td><td><div>Frequency : '+Frequency+'</div><div>Dose : '+Dose+'</div><div>Next Refill Date : '+NextRefillDate+'</div><div>Quantitiy : '
+Quantitiy+'</div><div>Details : '+Details+'</div><div><strong>Status : '+Status+'</strong></div></td><td id="StatusBtn'+hiddenBtn+'">'
+'<a onclick="Approve(\'' + Name + '\',\''+orderedPres[indexOfOrder]+'\',\''+Status+'\')"><button type="button" class="btn btn-outline-success"><i class="fa fa-check"></i>&nbsp; Approve</button></a>&nbsp;&nbsp;'
+'<a onclick="Deny(\'' + Name + '\',\''+orderedPres[indexOfOrder]+'\',\''+MedMRN+'\',\''+Status+'\')"><button type="button" class="btn btn-outline-danger"><i class="fa fa-times"></i>&nbsp; Deny</button></a></td>';
$("#MedBody").append(HtmlDetails); // + '\',\''+MedArray

//'<a onclick="Approve(\'' + Name + '\',\''+orderedPres[indexOfOrder]+'\',\''+Status+'\')" class="w3-btn w3-green"><span>Approve</span></a>&nbsp;&nbsp;'
if (Status!="Pending") {
hideBtn(hiddenBtn); }

}); // ref on Med
} // manageOrder method

function hideBtn(hiddenBtn) { // hideBtn
  var Stid = "#StatusBtn";
  Stid = Stid.concat(hiddenBtn);
  // console.log(Stid);
  // $("#AppDen_th").hide();
  $(Stid).hide(); }


function Approve(MedName,ordPres,Status){
  // if (Status == "Approved" ){
  //   alert("Prescriped "+MedName+" is already Approved");
  //   $("#body").load();}

// ++++++++++++ Approve OrderStatus from prescription orders root node
var PressRef = root.child(ordPres);
var Med;
  PressRef.orderByChild("Name").equalTo(MedName).on("child_added", function(snapshot) {
    Med = snapshot;});
var MedRef = root.child(ordPres).child(Med.key);
var satPrice = prompt("Please set a Price for the approval medicine!");
// window.alert(satPrice);
while (satPrice==null || satPrice.trim()=="" || satPrice.trim().match(/^[0-9]*$/) == null) {
  window.alert("Please set a valid Price or 0 for free indication");
  satPrice = prompt("Please you must to set a Price for the approval medicine!");}

MedRef.update(
{ OrderStatus: "Approved",
Price: satPrice });


// ++++++++++++ Approve OrderStatus from orders node inside Patient
var medMRN = Med.child("MRN").val();
var users = root.parent.child("users");
  users.orderByChild("Role").equalTo("Patient").on("child_added", function(patientNode) {
    var Mrn = patientNode.child("MRN").val();
    if (Mrn==medMRN) {
      firebase.database().ref('/users/'+patientNode.key+'/Orders/'+PressRef.key+'/'+Med.key).update(
      { OrderStatus: "Approved",
      Price: satPrice
 });
} // if mrn
});
alert("Prescriped "+MedName+" is successfully Approved");

}// Approve function


// $("#div").load(" #div > *");
function Deny(MedName,ordPres,MRN,Status){
  // if (Status == "Denied" ){
  //   alert("Prescriped "+MedName+" is already Denied");
  //   $("#body").load();}

// ++++++++++++ Deny OrderStatus from orders node inside Patient
  var PressRef = root.child(ordPres);
  var Med;
    PressRef.orderByChild("Name").equalTo(MedName).on("child_added", function(snapshot) {
      Med = snapshot;});
  var MedRef = root.child(ordPres).child(Med.key);
  MedRef.update(
  { OrderStatus: "Denied" });

  // ++++++++++++ Deny OrderStatus from orders node inside Patient
  var medMRN = Med.child("MRN").val();
  var users = root.parent.child("users");
    users.orderByChild("Role").equalTo("Patient").on("child_added", function(patientNode) {
      var Mrn = patientNode.child("MRN").val();
      if (Mrn==medMRN) {
        firebase.database().ref('/users/'+patientNode.key+'/Orders/'+PressRef.key+'/'+Med.key).update(
        { OrderStatus: "Denied" });
  } // if mrn
});

alert("Prescriped "+MedName+" has been Denied");
var answer  = confirm("Would you like to subtitute the denied medicine to another one?");
if (answer){
  // var satPrice = prompt("Please enter a Price for the approval medicine!");
  subtitute(MedName,ordPres,MRN);}
else {
  $("#").load(" #tableBody> *"); }
} // deny function

function subtitute(MedName,ordPres,MRN) {
  window.location = "/Prescription/subtituteMed.html?MRN="+MRN+"&Rx="+ordPres;

}

function MedicalHistory(rowID,hisMRN,numOfPres){

// to hilight the specified row
//hilightROW(rowID,numOfPres);

// to display hidden div
  var div = document.getElementById("MedHistory");
  if (div.style.display==='block'){ div.style.display='none';}
  if (div.style.display==='none'){ div.style.display='block';
  document.getElementById("orderDescription").style.display='none';}

var patientRoot = root.parent.child("users");
var MedicalHistory;
patientRoot.orderByChild("Role").equalTo("Patient").on("child_added", function(patientNode) {
  var Mrn = patientNode.child("MRN").val();
  if (Mrn==hisMRN){
  MedicalHistory = patientNode.child("MedicalHistory").val();
  document.getElementById("MedHistory").innerHTML = MedicalHistory;}
});

} //  Medical History function

// function hilightROW(rowID,numOfPres) {
//   for(var j=1; j<=numOfPres; j++){ // to remove hilight of all rows
//     document.getElementById(j).style.backgroundColor = '#FFFFFF	';}
//     document.getElementById(rowID).style.backgroundColor='#BCD4EC';
//
//
// }

  
