// Records page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let records = [];
    let stats = {
        totalTests: 0,
        avgWPM: 0,
        avgAccuracy: 0,
        bestWPM: 0,
        bestAccuracy: 0
    };

    // Function to load records from localStorage
    function loadRecords() {
        const savedRecords = localStorage.getItem('typingRecords');
        if (savedRecords) {
            records = JSON.parse(savedRecords);
            updateStats();
            displayRecords();
        }
    }

    // Calculate and update statistics
    function updateStats() {
        if (records.length === 0) return;

        stats.totalTests = records.length;
        
        // Calculate averages and find bests
        let totalWPM = 0;
        let totalAccuracy = 0;
        stats.bestWPM = 0;
        stats.bestAccuracy = 0;

        records.forEach(record => {
            totalWPM += record.wpm;
            totalAccuracy += record.accuracy;
            
            stats.bestWPM = Math.max(stats.bestWPM, record.wpm);
            stats.bestAccuracy = Math.max(stats.bestAccuracy, record.accuracy);
        });

        stats.avgWPM = Math.round(totalWPM / records.length);
        stats.avgAccuracy = Math.round((totalAccuracy / records.length) * 10) / 10;

        displayStats();
    }

    // Display statistics in stat cards
    function displayStats() {
        document.getElementById('totalTests').textContent = stats.totalTests;
        document.getElementById('avgWPM').textContent = stats.avgWPM;
        document.getElementById('avgAccuracy').textContent = stats.avgAccuracy + '%';
        document.getElementById('bestWPM').textContent = stats.bestWPM;
        document.getElementById('bestAccuracy').textContent = stats.bestAccuracy + '%';
    }

    // Display records in table
    function displayRecords() {
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

    // Handle mobile table scrolling
    const table = document.querySelector('.records-table');
    if (table) {
        let isScrolling = false;
        let startX;
        let scrollLeft;

        table.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - table.offsetLeft;
            scrollLeft = table.scrollLeft;
        });

        table.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - table.offsetLeft;
            const walk = (x - startX) * 2;
            table.scrollLeft = scrollLeft - walk;
        });

        table.addEventListener('touchend', () => {
            isScrolling = false;
        });
    }

    // Handle retry button
    const retryButton = document.querySelector('.btn');
    if (retryButton) {
        retryButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });

        // Add touch-specific handling for mobile
        retryButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // Initial load
    loadRecords();
});
