document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    var li = createTaskElement(taskInput.value);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function deleteTaskItem(taskItem) {
    var taskList = document.getElementById("taskList");
    taskList.removeChild(taskItem);
    saveTasks();
}
function deleteTasks() {
}

function editTask(taskItem) {
    var newTaskText = prompt("Edit task:", taskItem.textContent.trim());

    if (newTaskText !== null) {
        taskItem.textContent = newTaskText + ' ';
        saveTasks();
    }
}

function readTasks() {
}

function updateTask() {
    addTask();
}

function saveTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].textContent.trim();
        
        taskText = taskText.replace("Delete", "").trim();
        taskText = taskText.replace("Edit", "").trim();
        
        tasks.push(taskText);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);

        taskList.innerHTML = "";

        for (var i = 0; i < tasks.length; i++) {
            var li = createTaskElement(tasks[i]);
            taskList.appendChild(li);
        }
    }
}

function createTaskElement(taskText) {
    var li = document.createElement("li");
    li.textContent = taskText;
    li.style.fontSize = "20px";

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.onclick = function () {
        editTask(li);
    };

    li.appendChild(editBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function () {
        deleteTaskItem(li);
    };

    li.appendChild(deleteBtn);

    return li;
}


