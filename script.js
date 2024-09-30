document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <span>${task.date}</span>
                <span>${task.name}</span>
                <span>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                </span>
            `;
            taskList.appendChild(li);
        });
    }

    
    function formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

   
    function formatDateForInput(dateString) {
        const [month, day, year] = dateString.split('/');
        return `${year}-${month}-${day}`; 
    }

    
    function addTask() {
        const task = {
            date: formatDateForDisplay(taskDate.value),  
            name: taskInput.value
        };

        if (task.name && task.date) {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
            taskDate.value = '';
        } else {
            alert('Please enter both date and task');
        }
    }

    
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    };

    
    window.editTask = function(index) {
        const task = tasks[index];
        taskInput.value = task.name;
        taskDate.value = formatDateForInput(task.date);  
        deleteTask(index);  
    };



   
    addTaskBtn.addEventListener('click', addTask);

    
    displayTasks();
});
