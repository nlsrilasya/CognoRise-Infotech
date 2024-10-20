/**
 * Countdown Timer
 * Consider inputs from user for date and time
 * Display the countdown through setInterval
 */

let givenDate;
let timer;

var today = new Date().toISOString().split('T')[0];
document.querySelector("input#inputDate").setAttribute('min', today);

function startTimer() {
  let dateInput = document.getElementById("inputDate").value;
  let timeInput = document.getElementById("inputTime").value;
  givenDate = new Date(dateInput + "T" + timeInput);

  // Check if the date is valid
  if (isNaN(givenDate)) {
    alert("Please select a valid date and time.");
    return;
  }

  document.querySelector(".btn__start").classList.add("hide");
  document.querySelector(".btn__reset").classList.remove("hide");
  timer = setInterval(count, 1000);
}

function resetTimer() {
  clearInterval(timer);
  
  document.querySelector("h1").textContent = ``;
  document.getElementById("inputDate").value = ``;
  document.getElementById("inputTime").value = ``;

  document.querySelector(".btn__start").classList.remove("hide");
  document.querySelector(".btn__reset").classList.add("hide");
}

// Function to count down the timer based on user's input
function count() {
  // Get current date and calculate the duration in milliseconds
  const currentDate = new Date();
  const duration = givenDate - currentDate;
  if (duration <= 0) {
    clearInterval(timer);
    document.querySelector("h1").textContent = "Time is up!";
    return;
  }

  // Calculate days, hours, minutes and seconds
  let seconds = Math.floor(duration / 1000) % 60;
  let minutes = Math.floor(duration / (1000 * 60)) % 60;
  let hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));

  // Format numbers to ensure two digits
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  days = days < 10 ? "0" + days : days;

  // Update the h1 element with the countdown
  document.querySelector(
    "h1"
  ).textContent = `${days} : ${hours} : ${minutes} : ${seconds}`;

  // Clear the interval once all the units become zero
  if (hours == "00" && minutes == "00" && seconds == "00" && days == "00") {
    clearInterval(timer);
    document.querySelector("h1").textContent = "Time is up!";
  }
}
