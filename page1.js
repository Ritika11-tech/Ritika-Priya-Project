// page1.js
function startTest() {
    username = document.getElementById('username').value.trim();
    if (username) {
        saveToLocalStorage('username', username);
        navigateToPage(2);
    } else {
        alert('Please enter a username');
    }
}