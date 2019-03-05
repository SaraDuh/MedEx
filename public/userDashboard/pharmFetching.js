var config = {
  apiKey: "AIzaSyDQLxQEkY_lbpnQQi_JS8MXqCxgMIZr6eY",
  authDomain: "medex-e6e1f.firebaseapp.com",
  databaseURL: "https://medex-e6e1f.firebaseio.com",
  projectId: "medex-e6e1f",
  storageBucket: "medex-e6e1f.appspot.com",
  messagingSenderId: "1006108228892"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = '/Login_v2/index.html';
    //If User is not logged in, redirect to login page
  }
});

function logout(){

  firebase.auth().signOut();
  console.log("user logged out");
  window.location = '/Login_v2/index.html';
}

var root = firebase.database().ref().child("Prescription Orders");
// window.alert(root);

// var MRN,Status;
var orderedPres
root.on("value", snap => {
// console.log(snap.val());
// console.log(Object.keys(snap.val()));
// console.log(Object.keys(snap.val()).length);

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
 +Status+'</span></td><td><a onclick="manageOrder('+counter+','+i+','+numOfPres+')"><span style="background: #00B2F4" class="badge badge-complete">Manage Order</span></a></td></tr>';
counter++;
// $("#tableBody").append(HTMLtxt);
document.getElementById("tableBody").innerHTML = HTMLtxt;
}

});


function manageOrder(rowID,indexOfOrder,numOfPres){
  // to hilight the specified row
  hilightROW(rowID,numOfPres);

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

   Frequency = Med.child(" Frequency").val();
   Dose = Med.child("Dose").val();
   Name = Med.child("Name").val();
   NextRefillDate = Med.child("NextRefillDate").val();
   Quantitiy = Med.child("Quantitiy").val();
   Details = Med.child("RelatedDetails").val();
   Status = Med.child("OrderStatus").val();
   MedMRN = Med.child("MRN").val();
   hiddenBtn++;


  HtmlDetails = '<tr><td class="serial">'+Name+'</td><td><div>'+Frequency+'</div><div>'+Dose+'</div><div>'+NextRefillDate+'</div><div>'
+Quantitiy+'</div><div>'+Details+'</div><div><strong>'+Status+'</strong></div></td><td id="StatusBtn'+hiddenBtn+'">'
+'<a onclick="Approve(\'' + Name + '\',\''+orderedPres[indexOfOrder]+'\',\''+Status+'\')" class="w3-btn w3-green"><span>Approve</span></a>&nbsp;&nbsp;'
+'<a onclick="Deny(\'' + Name + '\',\''+orderedPres[indexOfOrder]+'\',\''+MedMRN+'\',\''+Status+'\')" class="w3-btn w3-red"><span>Deny</span></a></td>';
$("#MedBody").append(HtmlDetails); // + '\',\''+MedArray

if (Status!="Pending") {
hideBtn(hiddenBtn); }

}); // ref on Med
} // manageOrder method

function hideBtn(hiddenBtn) { // hideBtn
  var Stid = "#StatusBtn";
  Stid = Stid.concat(hiddenBtn);
  // console.log(Stid);
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
while (satPrice==null) { satPrice = prompt("Please you must to set a Price for the approval medicine!");}

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
hilightROW(rowID,numOfPres);

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

function hilightROW(rowID,numOfPres) {
  for(var j=1; j<=numOfPres; j++){ // to remove hilight of all rows
    document.getElementById(j).style.backgroundColor = '#FFFFFF	';}
    document.getElementById(rowID).style.backgroundColor='#BCD4EC';


}

        // jQuery(document).ready(function($) {
        //     "use strict";
        //     // Pie chart flotPie1
        //     var piedata = [
        //         { label: "Desktop visits", data: [[1,32]], color: '#5c6bc0'},
        //         { label: "Tab visits", data: [[1,33]], color: '#ef5350'},
        //         { label: "Mobile visits", data: [[1,35]], color: '#66bb6a'}
        //     ];
        //     $.plot('#flotPie1', piedata, {
        //         series: {
        //             pie: {
        //                 show: true,
        //                 radius: 1,
        //                 innerRadius: 0.65,
        //                 label: {
        //                     show: true,
        //                     radius: 2/3,
        //                     threshold: 1
        //                 },
        //                 stroke: {
        //                     width: 0
        //                 }
        //             }
        //         },
        //         grid: {
        //             hoverable: true,
        //             clickable: true
        //         }
        //     });
        //     // Pie chart flotPie1  End
        //     // cellPaiChart
        //     var cellPaiChart = [
        //         { label: "Direct Sell", data: [[1,65]], color: '#5b83de'},
        //         { label: "Channel Sell", data: [[1,35]], color: '#00bfa5'}
        //     ];
        //     $.plot('#cellPaiChart', cellPaiChart, {
        //         series: {
        //             pie: {
        //                 show: true,
        //                 stroke: {
        //                     width: 0
        //                 }
        //             }
        //         },
        //         legend: {
        //             show: false
        //         },grid: {
        //             hoverable: true,
        //             clickable: true
        //         }
        //     });
        //     // cellPaiChart End
        //     // Line Chart  #flotLine5
        //     var newCust = [[0, 3], [1, 5], [2,4], [3, 7], [4, 9], [5, 3], [6, 6], [7, 4], [8, 10]];
        //     var plot = $.plot($('#flotLine5'),[{
        //         data: newCust,
        //         label: 'New Data Flow',
        //         color: '#fff'
        //     }],
        //     {
        //         series: {
        //             lines: {
        //                 show: true,
        //                 lineColor: '#fff',
        //                 lineWidth: 2
        //             },
        //             points: {
        //                 show: true,
        //                 fill: true,
        //                 fillColor: "#ffffff",
        //                 symbol: "circle",
        //                 radius: 3
        //             },
        //             shadowSize: 0
        //         },
        //         points: {
        //             show: true,
        //         },
        //         legend: {
        //             show: false
        //         },
        //         grid: {
        //             show: false
        //         }
        //     });
        //     // Line Chart  #flotLine5 End
        //     // Traffic Chart using chartist
        //     if ($('#traffic-chart').length) {
        //         var chart = new Chartist.Line('#traffic-chart', {
        //           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        //           series: [
        //           [0, 18000, 35000,  25000,  22000,  0],
        //           [0, 33000, 15000,  20000,  15000,  300],
        //           [0, 15000, 28000,  15000,  30000,  5000]
        //           ]
        //       }, {
        //           low: 0,
        //           showArea: true,
        //           showLine: false,
        //           showPoint: false,
        //           fullWidth: true,
        //           axisX: {
        //             showGrid: true
        //         }
        //     });
        //         chart.on('draw', function(data) {
        //             if(data.type === 'line' || data.type === 'area') {
        //                 data.element.animate({
        //                     d: {
        //                         begin: 2000 * data.index,
        //                         dur: 2000,
        //                         from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        //                         to: data.path.clone().stringify(),
        //                         easing: Chartist.Svg.Easing.easeOutQuint
        //                     }
        //                 });
        //             }
        //         });
        //     }
        //     // Traffic Chart using chartist End
        //     //Traffic chart chart-js
        //     if ($('#TrafficChart').length) {
        //         var ctx = document.getElementById( "TrafficChart" );
        //         ctx.height = 150;
        //         var myChart = new Chart( ctx, {
        //             type: 'line',
        //             data: {
        //                 labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul" ],
        //                 datasets: [
        //                 {
        //                     label: "Visit",
        //                     borderColor: "rgba(4, 73, 203,.09)",
        //                     borderWidth: "1",
        //                     backgroundColor: "rgba(4, 73, 203,.5)",
        //                     data: [ 0, 2900, 5000, 3300, 6000, 3250, 0 ]
        //                 },
        //                 {
        //                     label: "Bounce",
        //                     borderColor: "rgba(245, 23, 66, 0.9)",
        //                     borderWidth: "1",
        //                     backgroundColor: "rgba(245, 23, 66,.5)",
        //                     pointHighlightStroke: "rgba(245, 23, 66,.5)",
        //                     data: [ 0, 4200, 4500, 1600, 4200, 1500, 4000 ]
        //                 },
        //                 {
        //                     label: "Targeted",
        //                     borderColor: "rgba(40, 169, 46, 0.9)",
        //                     borderWidth: "1",
        //                     backgroundColor: "rgba(40, 169, 46, .5)",
        //                     pointHighlightStroke: "rgba(40, 169, 46,.5)",
        //                     data: [1000, 5200, 3600, 2600, 4200, 5300, 0 ]
        //                 }
        //                 ]
        //             },
        //             options: {
        //                 responsive: true,
        //                 tooltips: {
        //                     mode: 'index',
        //                     intersect: false
        //                 },
        //                 hover: {
        //                     mode: 'nearest',
        //                     intersect: true
        //                 }
        //             }
        //         } );
        //     }
        //     //Traffic chart chart-js  End
        //     // Bar Chart #flotBarChart
        //     $.plot("#flotBarChart", [{
        //         data: [[0, 18], [2, 8], [4, 5], [6, 13],[8,5], [10,7],[12,4], [14,6],[16,15], [18, 9],[20,17], [22,7],[24,4], [26,9],[28,11]],
        //         bars: {
        //             show: true,
        //             lineWidth: 0,
        //             fillColor: '#ffffff8a'
        //         }
        //     }], {
        //         grid: {
        //             show: false
        //         }
        //     });
        //     // Bar Chart #flotBarChart End
        // });
