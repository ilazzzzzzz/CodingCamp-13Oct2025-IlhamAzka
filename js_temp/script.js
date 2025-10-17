const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const taskTable = document.getElementById('taskTable');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let tasks = [];

function renderTasks() {
  taskTable.innerHTML = "";

  if (tasks.length === 0) {
    taskTable.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.done ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskTable.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === "" || date === "") {
    alert("Please enter both task and date!");
    return;
  }

  const newTask = { text, date, done: false };
  tasks.push(newTask);

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAll);

// Initial render
renderTasks();
