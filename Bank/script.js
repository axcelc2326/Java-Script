let balance = parseFloat(localStorage.getItem('atmBalance')) || 0;


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('balance').value = balance;
});


function checkBalance() {
    document.getElementById('message').innerText = `Your balance is $${balance}`;
}


function deposit() {
    const depositAmount = prompt("Enter deposit amount");
    if (depositAmount && !isNaN(depositAmount)) {
        balance += parseFloat(depositAmount);
        updateBalance();
        document.getElementById('message').innerText = "Deposit successful";
    } else {
        document.getElementById('message').innerText = "Invalid deposit amount.";
    }
}


function withdraw() {
    const withdrawAmount = prompt("Enter withdraw amount");
    if (withdrawAmount && !isNaN(withdrawAmount)) {
        if (parseFloat(withdrawAmount) <= balance) {
            balance -= parseFloat(withdrawAmount);
            updateBalance();
            document.getElementById('message').innerText = "Withdraw successful";
        } else {
            document.getElementById('message').innerText = "Insufficient funds.";
        }
    } else {
        document.getElementById('message').innerText = "Invalid withdrawal amount";
    }
}


function updateBalance() {
    document.getElementById('balance').value = balance;
    localStorage.setItem('atmBalance', balance); 
}


function exit() {
    alert("Thank you for using the ATM.");
    // document.getElementById('balance').value = 0;
    // document.getElementById('message').innerText = "Thank you for using the ATM.";
    //     balance = 0;
    // localStorage.removeItem('atmBalance'); 
}