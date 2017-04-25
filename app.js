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
  		freq: freq
  	});
  });


  database.ref().on("child_added", function(childSnapshot) {

  	var snap = childSnapshot.val();

  	var newRow = $("<tr>");

  	newRow.append("<td>" + snap.name + "</td>");
  	newRow.append("<td>" + snap.dest + "</td>");
  	newRow.append("<td>" + snap.freq + "</td>");
  	newRow.append("<td>" + 0 + "</td>");
  	newRow.append("<td>" + 0 + "</td>");

  	$("tbody").append(newRow);

  });

});