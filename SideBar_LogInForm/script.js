document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // Initialize the users array in localStorage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

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

        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users'));

        // Check if the username already exists
        const userExists = users.some(user => user.username === newUsername);

        if (userExists) {
            alert('Username already exists. Please choose another.');
        } else {
            // Add the new user to the array
            users.push({ username: newUsername, password: newPassword });

            // Save the updated array back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            alert('Sign up successful! You can now log in.');
            signupForm.reset();
            loginSection.style.display = 'block';
            signupSection.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users'));

        // Check if the entered username and password match any user
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Login successful!');
            window.location.href = '../SideBar/index.html'; // Redirect on successful login
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
