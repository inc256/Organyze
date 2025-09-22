document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update UI with user data
    document.getElementById('user-initial').textContent = userData.name.charAt(0).toUpperCase();
    document.getElementById('credit-count').textContent = userData.credits;
    document.getElementById('account-name').textContent = userData.name;
    document.getElementById('account-email').textContent = userData.email;
    document.getElementById('account-plan').textContent = userData.plan;
    document.getElementById('account-credits').textContent = userData.credits;
    document.getElementById('account-joined').textContent = userData.joined;
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.href = 'homepage.html';
    });
    
    // Upgrade button
    document.getElementById('upgrade-btn').addEventListener('click', () => {
        showNotification("Premium plans coming soon!", "error");
    });
    
    // Log out button
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    });
});