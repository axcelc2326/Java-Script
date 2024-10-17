document.getElementById("info-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let type = document.getElementById("type").value;
    let color = document.getElementById("color").value;
    let age = document.getElementById("age").value;
    let doctor = document.getElementById("doctor").value;
    let appointmentDate = document.getElementById("appointment-date").value;
    let check = document.getElementById("check").checked; 
    const imgInput = document.getElementById("pet-image");
    const img = document.createElement('img');


    if (imgInput.files.length > 0) {
        const file = imgInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.alt = 'Pet Image';
            img.style.width = '300px'; 
        };
        reader.readAsDataURL(file);
    } else {
        img.src = '../Midterm/nopic.jpeg'; 
        img.alt = 'No Picture';
        img.style.width = '300px'; 
    }

    if (name === '') {
        alert('Name cannot be empty!');
        return;
    }
    if (age === '') {
        alert('Age cannot be empty!');
        return;
    }
    if (appointmentDate === '') {
        alert('Appointment date cannot be empty!');
        return;
    }

    let summaryItem = document.createElement('div');
    summaryItem.classList.add('summary-item');

    let summaryContent = `
        <h3>
            Name: ${name} <br>
            Type: ${type} <br>
            Color: ${color} <br>
            Age: ${age} <br>
            Doctor: ${doctor} <br>
            Appointment Date: ${appointmentDate} <br>
            Info: ${check ? 'Needs a Doctor Care' : 'Check Up Only'}
        </h3>
    `;

    let editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        document.getElementById("name").value = name;
        document.getElementById("type").value = type;
        document.getElementById("color").value = color;
        document.getElementById("age").value = age;
        document.getElementById("doctor").value = doctor;
        document.getElementById("appointment-date").value = appointmentDate;
        document.getElementById("check").checked = check;

        summaryItem.remove();
    };

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Done';
    deleteButton.onclick = function() {
        summaryItem.remove();
        alert("Status: Healed");
        alert("Thank You For Your Visit!!!");
    };


    summaryItem.innerHTML = summaryContent;
    summaryItem.appendChild(img);
    summaryItem.appendChild(deleteButton);
    summaryItem.appendChild(editButton);

    document.getElementById('Summary').appendChild(summaryItem);
    document.getElementById("info-form").reset();
});
