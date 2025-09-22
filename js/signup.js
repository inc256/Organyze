document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const loginLink = document.getElementById('login-link');
    
    // Sign up button
    signupBtn.addEventListener('click', () => {
        const name = document.getElementById('signup-name').value || 'Demo User';
        const email = document.getElementById('signup-email').value || 'demo@organyze.com';
        
        // Store user data in localStorage
        const userData = {
            name: name,
            email: email,
            credits: 150,
            plan: "Free Tier",
            joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirect to homepage
        window.location.href = 'homepage.html';
    });
    
    // Login link (just goes to homepage directly for demo)
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'homepage.html';
    });
});