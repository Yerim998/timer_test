const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startStopBtn = document.getElementById("startStopBtn");
const startStopIcon = document.getElementById("startStopIcon");
const resetBtn = document.getElementById("resetBtn");
const resetIcon = document.getElementById("resetIcon");

let interval = null;
let isRunning = false;

function checkInput() {
  if (
    +hoursInput.value > 0 ||
    +minutesInput.value > 0 ||
    +secondsInput.value > 0
  ) {
    enableButton(startStopBtn, "img/start-default.png");
    enableButton(resetBtn, "img/reset-default.png");
  } else {
    disableButton(startStopBtn, "img/start-disabled.png");
    disableButton(resetBtn, "img/reset-disabled.png");
  }
}

function enableButton(button, iconPath) {
  button.disabled = false;
  button.querySelector("img").src = iconPath;
}

function disableButton(button, iconPath) {
  button.disabled = true;
  button.querySelector("img").src = iconPath;
}

function getTotalSeconds() {
  return (
    +hoursInput.value * 3600 + +minutesInput.value * 60 + +secondsInput.value
  );
}

function updateInputs(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  hoursInput.value = hrs;
  minutesInput.value = mins;
  secondsInput.value = secs;
}

function startTimer() {
  if (isRunning) return;
  let totalSeconds = getTotalSeconds();
  if (totalSeconds <= 0) return;

  isRunning = true;
  startStopIcon.src = "img/pause.png";
  resetBtn.disabled = true;
  resetIcon.src = "img/reset-disabled.png";

  interval = setInterval(() => {
    totalSeconds--;
    updateInputs(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(interval);
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  startStopIcon.src = "img/start-default.png";
  enableButton(resetBtn, "img/reset-default.png");
}

function toggleStartPause() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;
  startStopIcon.src = "img/start-disabled.png";
  disableButton(startStopBtn, "img/start-disabled.png");
  disableButton(resetBtn, "img/reset-disabled.png");
}

hoursInput.addEventListener("input", checkInput);
minutesInput.addEventListener("input", checkInput);
secondsInput.addEventListener("input", checkInput);
startStopBtn.addEventListener("click", toggleStartPause);
resetBtn.addEventListener("click", resetTimer);

function allowOnlyNumbers(e) {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
  }
}

hoursInput.addEventListener("keydown", allowOnlyNumbers);
minutesInput.addEventListener("keydown", allowOnlyNumbers);
secondsInput.addEventListener("keydown", allowOnlyNumbers);
