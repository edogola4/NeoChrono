// Selectors for each part of the digital clock
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");

const greeting = document.getElementById("greeting");
const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const alarmMessage = document.getElementById("alarm-message");

// Create snooze and stop buttons dynamically
const snoozeButton = document.createElement("button");
const stopButton = document.createElement("button");

snoozeButton.textContent = "Snooze";
stopButton.textContent = "Stop";

snoozeButton.className = "alarm-button snooze-button";
stopButton.className = "alarm-button stop-button";

snoozeButton.style.display = "none";
stopButton.style.display = "none";

document.querySelector(".alarm-container").append(snoozeButton, stopButton);

let alarmTime = null;
let alarmTimeout = null;

// Function to Update Digital Clock
function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Update each part of the clock individually
    hourElement.textContent = hours;
    minuteElement.textContent = minutes;
    secondElement.textContent = seconds;

    updateGreeting(now.getHours());
    checkAlarm(now);
}

// Function to Update Greeting
function updateGreeting(hour) {
    if (hour < 12) {
        greeting.textContent = "Good Morning!";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon!";
    } else {
        greeting.textContent = "Good Evening!";
    }
}

// Function to Set Alarm
setAlarmButton.addEventListener("click", () => {
    const alarmValue = alarmInput.value;
    if (alarmValue) {
        alarmTime = alarmValue;
        alarmMessage.textContent = `Alarm set for ${alarmTime}`;
        alarmMessage.style.color = "#de5337"; // Success color
    } else {
        alarmMessage.textContent = "Please select a valid time.";
        alarmMessage.style.color = "#e91e63"; // Error color
    }
});

// Function to Check Alarm
function checkAlarm(now) {
    if (alarmTime) {
        const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
        if (
            now.getHours() === alarmHour &&
            now.getMinutes() === alarmMinute &&
            now.getSeconds() === 0
        ) {
            // Trigger alarm
            triggerAlarm();
        }
    }
}

// Function to Trigger Alarm
function triggerAlarm() {
    alarmMessage.textContent = "Alarm Ringing!";
    alarmMessage.style.color = "#e91e63"; // Alert color

    alarmTime = null; // Reset the alarm

    // Show snooze and stop buttons
    snoozeButton.style.display = "inline-block";
    stopButton.style.display = "inline-block";

    playAlarmSound();
}

// Function to Play Alarm Sound
function playAlarmSound() {
    const audio = new Audio("./audio/alarm.mp3");
    audio.loop = true; // Repeat sound until stopped
    audio.play();

    // Snooze functionality
    snoozeButton.addEventListener("click", () => {
        alarmTime = getSnoozeTime(5); // Snooze for 5 minutes
        alarmMessage.textContent = `Alarm snoozed for 5 minutes.`;
        alarmMessage.style.color = "#fff"; // Success color
        stopAlarm(audio); // Stop current alarm sound
    });

    // Stop functionality
    stopButton.addEventListener("click", () => {
        alarmMessage.textContent = `Alarm stopped.`;
        alarmMessage.style.color = "#fff"; // Success color
        stopAlarm(audio); // Stop current alarm sound
    });
}

// Function to Stop Alarm Sound
function stopAlarm(audio) {
    snoozeButton.style.display = "none";
    stopButton.style.display = "none";
    audio.pause();
    audio.currentTime = 0; // Reset sound to the beginning
}

// Function to Calculate Snooze Time
function getSnoozeTime(minutes) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes); // Add snooze duration
    const snoozeHours = String(now.getHours()).padStart(2, "0");
    const snoozeMinutes = String(now.getMinutes()).padStart(2, "0");
    return `${snoozeHours}:${snoozeMinutes}`;
}

// Initialize the Clock
setInterval(updateClock, 1000);
updateClock(); // Call once immediately to avoid delay

// Styling for Snooze and Stop Buttons
snoozeButton.style.padding = "10px 20px";
snoozeButton.style.margin = "10px";
snoozeButton.style.border = "none";
snoozeButton.style.backgroundColor = "#4caf50"; // Green color
snoozeButton.style.color = "white";
snoozeButton.style.borderRadius = "5px";
snoozeButton.style.fontSize = "16px";
snoozeButton.style.cursor = "pointer";

stopButton.style.padding = "10px 20px";
stopButton.style.margin = "10px";
stopButton.style.border = "none";
stopButton.style.backgroundColor = "#e91e63"; // Pink color
stopButton.style.color = "white";
stopButton.style.borderRadius = "5px";
stopButton.style.fontSize = "16px";
stopButton.style.cursor = "pointer";
