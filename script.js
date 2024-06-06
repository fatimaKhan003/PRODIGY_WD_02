let startTime;
let updatedTime;
let difference = 0; // default difference to 0
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');
const circle = document.querySelector('.circle');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTimer, 100); // Updating every 100ms for smooth transition
        running = true;
        startButton.textContent = 'Resume';
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    running = false;
    display.textContent = "00:00:00";
    laps = [];
    lapsList.innerHTML = '';
    startButton.textContent = 'Start';
    updateCircle(0);
}

function lapTimer() {
    if (running) {
        const lapTime = formatTime(new Date().getTime() - startTime);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        if (body.classList.contains('dark-mode')) {
            lapItem.classList.add('dark-mode-lap');
        } else {
            lapItem.classList.add('light-mode-lap');
        }
        lapsList.appendChild(lapItem);
    }
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
    updateCircle(updatedTime);
}

function updateCircle(time) {
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const progress = seconds / 60;
    circle.style.background = `conic-gradient(#4CAF50 ${progress * 360}deg, #e0e0e0 0deg)`;
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
        themeToggle.style.backgroundColor = '#fff'; // Light mode button color
        themeToggle.style.color = '#000';
    } else {
        themeToggle.textContent = 'Dark Mode';
        themeToggle.style.backgroundColor = '#000'; // Dark mode button color
        themeToggle.style.color = '#fff';
    }
    // Update existing lap items based on the current theme
    const lapItems = lapsList.getElementsByTagName('li');
    for (let i = 0; i < lapItems.length; i++) {
        lapItems[i].classList.toggle('dark-mode-lap');
        lapItems[i].classList.toggle('light-mode-lap');
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
themeToggle.addEventListener('click', toggleTheme);