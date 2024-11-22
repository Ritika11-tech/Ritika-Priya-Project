// shared.js
const texts = {
    beginner: "The quick brown fox jumps over the lazy dog. Simple words make up this beginner test. Take your time and focus on accuracy.",
    medium: "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
    high: "In quantum mechanics, quantum entanglement is a phenomenon in which the quantum states of particles cannot be described independently, even when separated by a large distance."
};

let currentPage = 1;
let timer;
let timeLeft = 60;
let typingStarted = false;
let username = '';
let startTime, endTime;
let currentText = '';
let currentDifficulty = '';

function navigateToPage(pageNumber) {
    window.location.href = `page${pageNumber}.html`;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}