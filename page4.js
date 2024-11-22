// page4.js
document.addEventListener('DOMContentLoaded', function() {
    displayRecords();
});

function displayRecords() {
    const username = getFromLocalStorage('username');
    const records = getFromLocalStorage('typingRecords') || {};
    const userRecords = records[username] || [];
    const recordsList = document.getElementById('records-list');
    const personalBest = document.getElementById('personal-best');
    const averageStats = document.getElementById('average-stats');
    
    // Sort records by WPM
    userRecords.sort((a, b) => b.wpm - a.wpm);
    
    // Calculate statistics
    if (userRecords.length > 0) {
        const totalWPM = userRecords.reduce((sum, record) => sum + record.wpm, 0);
        const totalAccuracy = userRecords.reduce((sum, record) => sum + record.accuracy, 0);
        const avgWPM = Math.round(totalWPM / userRecords.length);
        const avgAccuracy = Math.round(totalAccuracy / userRecords.length);
        
        personalBest.innerHTML = `
            <h3>Personal Best</h3>
            <p>WPM: ${userRecords[0].wpm}</p>
            <p>Accuracy: ${userRecords[0].accuracy}%</p>
            <p>Difficulty: ${userRecords[0].difficulty}</p>
        `;
        
        averageStats.innerHTML = `
            <h3>Average Stats</h3>
            <p>Average WPM: ${avgWPM}</p>
            <p>Average Accuracy: ${avgAccuracy}%</p>
            <p>Tests Taken: ${userRecords.length}</p>
        `;
    }
    
    // Display recent records
    recordsList.innerHTML = userRecords.map((record) => `
        <tr>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.difficulty}</td>
            <td>${record.wpm}</td>
            <td>${record.accuracy}%</td>
            <td>${record.timeTaken}s</td>
        </tr>
    `).join('');
}

function restartTest() {
    navigateToPage(1);
}
