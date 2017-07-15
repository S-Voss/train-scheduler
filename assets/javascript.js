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
  var nextArrival = "";
  var minutesAway = "";

	$("#add-train-btn").on("click", function(){
    event.preventDefault();

		var trainName = $("#train-name-input").val().trim();
		var destination = $("#destination-input").val().trim();
    var frequency = moment($("#frequency-input").val().trim(), "mm").format("mm");
		var firstTrain = moment($("#first-train-input").val().trim(), "hh:mm:ss").format("hh:mm:ss");

console.log(frequency);
console.log(firstTrain);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
      nextArrival: nextArrival,
      minutesAway: minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
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

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // // Assumptions
    // var tFrequency = 3;
    //
    // // Time is 3:30 AM
    // var firstTime = "03:30";
    //
    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    //
    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    //
    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    //
    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    //
    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    //
    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
