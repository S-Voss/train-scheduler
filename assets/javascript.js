// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZp3W09Vkc2MtL0eHHziMKm34A6ym8wDk",
  authDomain: "vossbase.firebaseapp.com",
  databaseURL: "https://vossbase.firebaseio.com",
  projectId: "vossbase",
  storageBucket: "vossbase.appspot.com",
  messagingSenderId: "47313022887"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function(){

	$("#add-train-btn").on("click", function(){
    event.preventDefault();

		var trainName = $("#train-name-input").val().trim();
		var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
		var firstTrain = moment($("#first-train-input").val().trim(), 'hh:mm');

    console.log('frequency', frequency);
    console.log('firstTrain', firstTrain);
    var timeDiff = moment().diff(moment(firstTrain), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);
    // Time apart (remainder)
    var tRemainder = timeDiff % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log(nextArrival);
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    var data = {
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain.toISOString(),
      nextArrival: nextArrival.toISOString(),
      minutesAway: minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    console.log(data);

    database.ref().push(data);
	});

	database.ref().on("child_added", function(childSnapShot) {
	  $("#trains-table").append("<tr>" +
	  									 "<td>" + childSnapShot.val().trainName + "</td>" +
	     								 "<td>" + childSnapShot.val().destination + "</td>" +
	     								 "<td>" + childSnapShot.val().frequency + "</td>" +
	     								 "<td>" + childSnapShot.val().nextArrival + "</td>" +
	     								 "<td>" + childSnapShot.val().minutesAway + "</td>" +
	     								 "</tr>");
	});

});
