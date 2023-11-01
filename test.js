const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('tasks');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const incompleteTasks = document.getElementById('incompleteTasks');

addTask.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    deleteTask(event.target);
  }
  if (event.target.classList.contains('edit')) {
    editTask(event.target);
  }
  if (event.target.classList.contains('complete')) {
    toggleComplete(event.target);
  }
  if (event.target.classList.contains('save')) {
    saveTask(event.target);
  }
});

function createTask(taskText) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="checkbox" class="complete"> 
    <span class="task">${taskText}</span> 
    <button class="edit">編集</button> 
    <button class="delete">削除</button>
  `;
  taskList.appendChild(listItem);
  updateTaskCount();
}

function deleteTask(deleteButton) {
  const listItem = deleteButton.parentElement;
  if (confirm('削除してもよろしいですか？')) {
    listItem.remove();
    updateTaskCount();
  }
}

function editTask(editButton) {
  const listItem = editButton.parentElement;
  const taskTextElement = listItem.querySelector('.task');
  const taskText = taskTextElement.textContent;
  listItem.classList.add('editing');
  listItem.innerHTML = `
    <input type="text" class="edit-text" value="${taskText}">
    <button class="save">保存</button>
  `;
}

function saveTask(saveButton) {
  const listItem = saveButton.parentElement;
  const editInput = listItem.querySelector('.edit-text');
  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task');
  taskTextElement.textContent = editInput.value;
  listItem.classList.remove('editing');
  listItem.innerHTML = `
    <input type="checkbox" class="complete"> 
    ${taskTextElement.outerHTML}
    <button class="edit">編集</button> 
    <button class="delete">削除</button>
  `;
  updateTaskCount();
}

function toggleComplete(completeCheckbox) {
  const listItem = completeCheckbox.parentElement;
  listItem.classList.toggle('completed');
  updateTaskCount();
}

function updateTaskCount() {
  totalTasks.textContent = taskList.childElementCount;
  completedTasks.textContent = taskList.querySelectorAll('.completed').length;
  incompleteTasks.textContent = totalTasks.textContent - completedTasks.textContent;
}