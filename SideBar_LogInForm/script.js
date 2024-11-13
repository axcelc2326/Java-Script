document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    showSignup.addEventListener('click', function () {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    showLogin.addEventListener('click', function () {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);

        alert('Sign up successful! You can now log in.');
        signupForm.reset(); 
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            alert('Login successful!');
            window.location.href = '../SideBar/index.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
