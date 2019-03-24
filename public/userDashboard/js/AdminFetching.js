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
      if (Rol != "Admin") {
        if (Rol=="Physician") window.location = 'dashboard.html';
         else if (Rol=="Pharmacist") window.location = 'pharmDashboard.html'; }
    });
});

function logout(){

  firebase.auth().signOut();
  console.log("user logged out");
  window.location = '/Login_v2/index.html';
}



var root = firebase.database().ref().child("users");
var counter = 0;




root.on("child_added", snap => {
  var role = snap.child("Role").val();
  if (role=="Driver") {
    counter++;
  var area = snap.child("DeliveryArea").val();
  var Name = snap.child("Name").val();
  var PhoneNo = snap.child("PhoneNo").val();
  var email = snap.child("Email").val();
  var HTMLtxt = '<tr><td class="serial">'+counter+'.</td><td id="MRN'+counter+'">'+Name+'</td><td><span class="name">'
  +area+'</span></td><td><span class="product">'+PhoneNo+'</span></td><td><span class="product">'+email+'</span></td><td><a href="#" onclick="driverProfile(\''+Name + '\',\''+ area + '\',\''+PhoneNo +'\',\''+ email+'\')"><button type="button" class="btn btn-outline-primary btn-sm btn-outline-profile"><i class="fa fa-car"></i>&nbsp; Driver Profile</button></a></td></tr>';
//onclick="patientProfile(\''+Name + '\',\''+ MRN + '\',\''+Gender +'\',\''+ age + '\',\''+ phone+ '\',\''+MH+'\',\''+Address+'\',\''+PodtalCode+'\')"
   $("#tableBody").append(HTMLtxt);
 }
});

var P_phone;
function driverProfile(Name, area, phone, email){
  console.log(age);
    $("div#patname h2").text(Name);
    $("li.li1").find('font').html(area);
    // $("li.li2").find('font').html(gender);
    // $("li.li3").find('font').html(mrn);
    $("li.li2").find('font').html(phone);
    $("li.li3").find('font').html(email);
    //$("li.li6").find('font').html(address);
    //$("li.li7").find('font').html(postalCode);
    P_phone=phone;
  $("#DriverLilProfile").show();




}

function goToForm(){
  document.getElementById("a").href="../editProfile/index.html?PhoneNo="+P_phone;

}
