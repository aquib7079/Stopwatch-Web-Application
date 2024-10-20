let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];

const timeDisplay = document.getElementById("time");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

// Format time as HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start or Stop the timer
function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
    isRunning = true;
    startStopBtn.textContent = "Pause";
  }
}

// Reset the stopwatch
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapsContainer.innerHTML = "";
  lapTimes = [];
}

// Record a lap time
function recordLap() {
  if (!isRunning) return;

  const currentLapTime = elapsedTime; // Capture the current time
  const lapDifference = lapTimes.length > 0 
      ? currentLapTime - lapTimes[lapTimes.length - 1] // Calculate interval since last lap
      : currentLapTime; // For the first lap

  lapTimes.push(currentLapTime); // Store the current lap time
  
  const lapTimeElement = document.createElement("li");
  lapTimeElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapDifference)} (Total: ${formatTime(currentLapTime)})`;
  lapsContainer.appendChild(lapTimeElement);

  // Add show class for animation
  setTimeout(() => {
    lapTimeElement.classList.add('show');
  }, 100);
}

// Event Listeners
startStopBtn.addEventListener("click", startStopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
