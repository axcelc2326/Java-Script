document.getElementById('fees-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('student-name').value;
    let tuitionFee = Number(document.getElementById('tuition-fee').value);
    let miscFee = Number(document.getElementById('misc-fee').value);
    let otherFees = Number(document.getElementById('other-fees').value);
    let total = tuitionFee + miscFee + otherFees;

    let summaryItem = document.createElement('div');
    summaryItem.classList.add('summary-item');

    let summary = `
        <div>
            <h3> Student Information Fee</h3>
            <p>Student Name: ${name}</p>
            <p>Tuition Fee: ${tuitionFee.toFixed(2)}</p>
            <p>Miscellaneous Fee: ${miscFee.toFixed(2)}</p>
            <p>Other Fees: ${otherFees.toFixed(2)}</p>
            <p>Total Bill: ${total.toFixed(2)}</p>
            
        </div>
    `;
    

    let editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        
        document.getElementById("student-name").value = name;
        document.getElementById("tuition-fee").value = tuitionFee;
        document.getElementById("misc-fee").value = miscFee;
        document.getElementById("other-fees").value = otherFees;

        summaryItem.remove();
    };

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {

        summaryItem.remove();
    };

    summaryItem.innerHTML = summary;
    summaryItem.appendChild(editButton);
    summaryItem.appendChild(deleteButton);

    document.getElementById('summary').appendChild(summaryItem);
    document.getElementById("fees-form").reset();
});