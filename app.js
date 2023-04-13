//Selecting Elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

//All Events

function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

//Functions

function clearAllTodos(e) {
  if (confirm("Are you sure you want to delete all todos?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
  console.log(listItems);
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove(); //target to parent element
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo deleted successfully!!!✅✅✅");
  }
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim(); // remove spaces with trim
  if (newTodo === "") {
    showAlert("danger", "Add a todo please!!!🤬🤬🤬");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo added successfully!!!😎😎😎");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  //Set Timeout (deletes the alert message after 2 seconds)
  setTimeout(function () {
    alert.remove();
  }, 2500);
}

function addTodoToUI(newTodo) {
  // adds string value as list item ui

  const listItem = document.createElement("li"); // create list item
  const link = document.createElement("a"); //create link item
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  listItem.className = "list-group-item d-flex justify-content-between";

  //add Text Node
  listItem.appendChild(document.createTextNode(newTodo));

  //add link
  listItem.appendChild(link);

  //add list to todo-list
  todoList.appendChild(listItem);
  todoInput.value = "";
}
