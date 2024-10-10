document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const ValidUserName = "axcel";
    const ValidPassword = "gwapo";

    if (username === '' || password === '') {
        errorMessage.textContent = 'Both fields are required.';
    } else if (username === ValidUserName && password === ValidPassword) {
        alert('Login successful!');
        errorMessage.textContent = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        window.location.href = '../Home/index.html'; 
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
});
