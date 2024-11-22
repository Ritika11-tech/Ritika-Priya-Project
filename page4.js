// page4.js
document.addEventListener('DOMContentLoaded', () => {
    // Load records from localStorage
    const records = JSON.parse(localStorage.getItem('typingRecords')) || [];
    
    // Calculate statistics
    const stats = calculateStats(records);
    
    // Display statistics and records
    displayStats(stats);
    displayRecords(records);
    
    // Add event listener for retry button
    document.querySelector('.btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function calculateStats(records) {
    if (records.length === 0) {
        return {
            totalTests: 0,
            avgWPM: 0,
            avgAccuracy: 0,
            bestWPM: 0,
            bestAccuracy: 0
        };
    }

    const totalTests = records.length;
    const avgWPM = Math.round(records.reduce((sum, record) => sum + record.wpm, 0) / totalTests);
    const avgAccuracy = Math.round(records.reduce((sum, record) => sum + record.accuracy, 0) / totalTests * 10) / 10;
    const bestWPM = Math.max(...records.map(record => record.wpm));
    const bestAccuracy = Math.max(...records.map(record => record.accuracy));

    return {
        totalTests,
        avgWPM,
        avgAccuracy,
        bestWPM,
        bestAccuracy
    };
}

function displayStats(stats) {
    document.getElementById('totalTests').textContent = stats.totalTests;
    document.getElementById('avgWPM').textContent = stats.avgWPM;
    document.getElementById('avgAccuracy').textContent = stats.avgAccuracy + '%';
    document.getElementById('bestWPM').textContent = stats.bestWPM;
    document.getElementById('bestAccuracy').textContent = stats.bestAccuracy + '%';
}

function displayRecords(records) {
    const tbody = document.querySelector('.records-table table tbody');
    tbody.innerHTML = '';

    // Sort records by date (most recent first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));

    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.date}</td>
            <td>${record.difficulty}</td>
            <td>${record.wpm}</td>
            <td>${record.accuracy}%</td>
            <td>${record.time}s</td>
        `;
        tbody.appendChild(row);
    });
}
