let tasks = [];
let editIndex = -1;

function renderList() {
  let ul = document.getElementById("taskList");
  ul.innerHTML = "";
  tasks.forEach((t, index) => {
    ul.innerHTML += `
      <li>
        <input type="checkbox" onchange="toggleDone(${index})" ${
      t.done ? "checked" : ""
    }>
        <span class="task-text ${t.done ? "checked" : ""}">${t.name}</span>
        <button onclick="editTask(${index})">Sửa</button>
        <button onclick="deleteTask(${index})">Xóa</button>
      </li>
    `;
  });
}

function saveOrUpdate() {
  let name = document.getElementById("taskName").value.trim();
  let message = document.getElementById("message");
  message.innerHTML = "";
  if (!name) {
    message.innerText = "Vui lòng nhập công việc!";
    message.style.color = "red";
    return;
  }

  if (editIndex === -1) {
    tasks.push({ name, done: false });
  } else {
    tasks[editIndex].name = name;
    editIndex = -1;
  }

  document.getElementById("taskName").value = "";
  renderList();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderList();
}

function editTask(index) {
  document.getElementById("taskName").value = tasks[index].name;
  editIndex = index;
}

function deleteTask(index) {
  if (confirm("Bạn có chắc muốn xóa công việc này?")) {
    tasks.splice(index, 1);
    renderList();
  }
}
