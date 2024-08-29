document.addEventListener('DOMContentLoaded', () => {
    const inputTask = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('button');
    const taskList = document.getElementById('tasklist');

    // Function to add a task
    function addTask(taskText = '') {
        const taskContent = taskText || inputTask.value.trim();

        // Validate input
        if (taskContent === '') {
            alert('Task cannot be empty!');
            return;
        }

        const list = document.createElement('li');
        list.classList.add('task');

        const textSpan = document.createElement('span');
        textSpan.textContent = taskContent;
        list.appendChild(textSpan);

        // Make the task editable when clicked
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('dblclick', () => {
            const newTaskText = prompt('Edit task:', textSpan.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                textSpan.textContent = newTaskText.trim();
            }
        });
        list.appendChild(editButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(list);
        });
        list.appendChild(deleteButton);

        taskList.appendChild(list);
        inputTask.value = '';
    }

    // Event listener for button click
    addTaskButton.addEventListener('click', (event) => {
        event.preventDefault();
        addTask();
    });

    // Event listener for Enter key press
    inputTask.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
});