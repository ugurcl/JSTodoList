
const addButton = document.querySelector(".todoBtn");
const todoList = document.querySelector("#taskList");
const todoValue = document.querySelector("#taskInput");


document.addEventListener("DOMContentLoaded", function () {
  let todo_list = JSON.parse(localStorage.getItem("todo_list")) || [];

  todo_list.forEach((text) => createTodo(text));

  addButton.addEventListener("click", addTodo);


  todoList.addEventListener("click", handleTaskActions);
});

// Yeni görev ekleme fonksiyonu
function addTodo(e) {
  e.preventDefault(); 

  const todoText = todoValue.value.trim();
  if (todoText === "") {
    alert("Lütfen bir görev girin.");
    return;
  }

  let todo_list = JSON.parse(localStorage.getItem("todo_list")) || [];

  todo_list.push(todoText);
  localStorage.setItem("todo_list", JSON.stringify(todo_list));


  createTodo(todoText);


  todoValue.value = "";
}


function createTodo(text) {
  const li = document.createElement("li");
  li.classList.add("items");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("item-value");

  const div = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const completeBtn = document.createElement("button");

  deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
  completeBtn.innerHTML = '<i class="bi bi-check"></i>';

  deleteBtn.classList.add("btn", "deleteBtn");
  completeBtn.classList.add("btn", "completeBtn");

  div.classList.add("buttons");
  div.appendChild(deleteBtn);
  div.appendChild(completeBtn);

  li.appendChild(span);
  li.appendChild(div);
  todoList.appendChild(li);
}

function handleTaskActions(e) {
  if (e.target.closest("button")) {
    const button = e.target.closest("button");
    const li = button.parentElement.parentElement;
    const text = li.querySelector(".item-value").textContent;

    if (button.classList.contains("deleteBtn")) {
      removeTask(li, text);
    } else if (button.classList.contains("completeBtn")) {
      completeTask(li);
    }
  }
}

function completeTask(li) {
  li.querySelector(".item-value").classList.toggle("completed");
}


function removeTask(li, text) {
  li.remove();

  let todo_list = JSON.parse(localStorage.getItem("todo_list")) || [];
  todo_list = todo_list.filter((item) => item !== text);
  localStorage.setItem("todo_list", JSON.stringify(todo_list));
}