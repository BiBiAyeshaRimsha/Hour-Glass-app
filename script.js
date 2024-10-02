// Get elements
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

let timer;
let elapsedTime = 0;
let running = false;
let startTime;
let lapCounter = 1;

// Function to update the display
function updateDisplay(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Function to pad single digits with zero
function pad(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

// Start or Stop the stopwatch
startStopBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        startStopBtn.textContent = "Stop";
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 1000);
    } else {
        running = false;
        startStopBtn.textContent = "Start";
        clearInterval(timer);
    }
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay(elapsedTime);
    lapTimes.innerHTML = "";  // Clear lap times
    startStopBtn.textContent = "Start";
});

// Record a lap time
lapBtn.addEventListener("click", () => {
    if (running) {
        const lapTime = elapsedTime;
        const lapTimeFormatted = document.createElement("li");
        lapTimeFormatted.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
        lapTimes.appendChild(lapTimeFormatted);
    }
});
