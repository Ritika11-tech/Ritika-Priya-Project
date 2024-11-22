// page3.js
document.addEventListener('DOMContentLoaded', function() {
    calculateResults();
});

function calculateResults() {
    const typedText = getFromLocalStorage('typedText');
    const startTime = new Date(getFromLocalStorage('startTime'));
    const endTime = new Date(getFromLocalStorage('endTime'));
    const currentText = texts[getFromLocalStorage('currentDifficulty')];
    
    const words = typedText.trim().split(/\s+/).length;
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const timeTakenSeconds = Math.round((endTime - startTime) / 1000);
    const wpm = Math.round(words / timeInMinutes);

    let correctChars = 0;
    const minLength = Math.min(typedText.length, currentText.length);
    for (let i = 0; i < minLength; i++) {
        if (typedText[i] === currentText[i]) {
            correctChars++;
        }
    }
    const accuracy = Math.round((correctChars / currentText.length) * 100);

    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('timeTaken').textContent = timeTakenSeconds;

    if (accuracy >= 95) {
        document.getElementById('congratulations').innerHTML = 
            '<div class="congratulations">🎉 Congratulations! Outstanding Accuracy! 🎉</div>';
    }

    saveRecord(wpm, accuracy, timeTakenSeconds);
}

function saveRecord(wpm, accuracy, timeTaken) {
    const username = getFromLocalStorage('username');
    const records = getFromLocalStorage('typingRecords') || {};
    if (!records[username]) {
        records[username] = [];
    }
    
    records[username].push({
        date: new Date().toISOString(),
        difficulty: getFromLocalStorage('currentDifficulty'),
        wpm: wpm,
        accuracy: accuracy,
        timeTaken: timeTaken
    });
    
    saveToLocalStorage('typingRecords', records);
}

function viewRecords() {
    navigateToPage(4);
}

function restartTest() {
    navigateToPage(1);
}