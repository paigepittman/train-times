$(document).ready(function() {

var config = {
    apiKey: "AIzaSyDO4GU44N6pzhiQgvdGF_oyITWBaAPU3dY",
    authDomain: "train-times-f328d.firebaseapp.com",
    databaseURL: "https://train-times-f328d.firebaseio.com",
    projectId: "train-times-f328d",
    storageBucket: "train-times-f328d.appspot.com",
    messagingSenderId: "41155541851"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {

  	event.preventDefault();

  	var name = $("#input-name").val();
  	var dest = $("#input-dest").val();
  	var time = $("#input-time").val();
  	var freq = $("#input-freq").val();

  	database.ref().push({
  		name: name,
  		dest: dest,
  		time: time,
  		freq: freq,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });


  database.ref().on("child_added", function(childSnapshot) {

  	

  	var snap = childSnapshot.val();

  	var tfreq = snap.freq;

  	var newRow = $("<tr>");

  	var firstTrain = moment(snap.time, "HH:mm").subtract(1, "years");

  	var diff = moment().diff(moment(firstTrain), "minutes");

  	var remain = diff % tfreq;

  	var tilNextTrain = tfreq - remain; 

  	var nextTrain = moment().add(tilNextTrain, "minutes").format("hh:mm");

  	

  	newRow.append("<td>" + snap.name + "</td>");
  	newRow.append("<td>" + snap.dest + "</td>");
  	newRow.append("<td>" + snap.freq + "</td>");

  	//current time diff first train time divided by frequency
  	newRow.append("<td>" + nextTrain + "</td>");
  	//next arrive diff current time
  	newRow.append("<td>" + tilNextTrain + "</td>");

  	$("tbody").append(newRow);

  });

});