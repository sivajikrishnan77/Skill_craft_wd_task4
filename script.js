const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the task list before re-rendering

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        // Task and date container
        const taskInfo = document.createElement('div');
        taskInfo.innerHTML = `<strong>${task.name}</strong> - <span>${task.date ? formatDateTime(task.date) : 'No Date'}</span>`;
        li.appendChild(taskInfo);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('task-buttons');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => enterEditMode(index); // Attach the edit function to button
        buttonsDiv.appendChild(editBtn);

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.onclick = () => toggleCompleteTask(index); // Mark task complete
        buttonsDiv.appendChild(completeBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index); // Delete task
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(buttonsDiv); // Append buttons to the list item
        taskList.appendChild(li); // Append task to the task list
    });
}

// Function to format the date and time
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'No Date'; // Handle cases where no date is set

    const date = new Date(dateTimeStr);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };

    const formattedDate = date.toLocaleDateString('en-US', options); // Format date
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time (HH:MM AM/PM)

    return `${formattedDate} ${formattedTime}`; // Concatenate date and time once
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    if (taskName) {
        const newTask = {
            name: taskName,
            date: taskDateValue || '',  // Set the date value from the input, or empty string if not provided
            completed: false
        };

        tasks.push(newTask); // Add the new task to the tasks array
        renderTasks(); // Re-render tasks

        taskInput.value = '';  // Clear input field
        taskDate.value = '';   // Clear date field
    }
});

// Toggle task completion
function toggleCompleteTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task at index
    renderTasks();
}

// Enter edit mode (replace text with input fields)
function enterEditMode(index) {
    const task = tasks[index];

    // Replace the current task item with input fields to edit the task name and date
    const li = taskList.children[index];
    li.innerHTML = ''; // Clear the current content

    // Input fields for editing task name and date
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = task.name;
    nameInput.classList.add('edit-name');

    const dateInput = document.createElement('input');
    dateInput.type = 'datetime-local';
    dateInput.value = task.date || '';
    dateInput.classList.add('edit-date');

    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('save-btn');
    saveBtn.onclick = () => saveEdit(index, nameInput.value, dateInput.value); // Call save function

    li.appendChild(nameInput); // Append name input field
    li.appendChild(dateInput); // Append date input field
    li.appendChild(saveBtn);   // Append save button
}

// Save edits for the task
function saveEdit(index, newName, newDate) {
    if (newName.trim()) {
        tasks[index].name = newName.trim(); // Save new task name
        tasks[index].date = newDate || '';  // Save new date
    }
    renderTasks(); // Re-render tasks
}
