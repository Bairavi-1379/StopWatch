let timer;
let isRunning = false;
let startTime;
let laps = [];

function startPause() {
    const startPauseButton = document.getElementById("startPause");

    if (!isRunning) {
        startPauseButton.textContent = "Pause";
        startTime = new Date() - (laps.length > 0 ? laps[laps.length - 1].elapsedTime : 0);
        timer = setInterval(updateDisplay, 10);
    } else {
        startPauseButton.textContent = "Resume";
        clearInterval(timer);
    }

    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const elapsedTime = new Date() - startTime;
        laps.push({ lapTime: elapsedTime, elapsedTime });
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = new Date() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    return (
        padStart(minutes) + ":" +
        padStart(seconds) + "." +
        padStart(Math.floor(milliseconds / 10))
    );
}

function padStart(value) {
    return value < 10 ? "0" + value : value;
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";

    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${formatTime(lap.lapTime)}`;
        lapsList.appendChild(li);
    });
}
