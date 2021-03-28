const modalBtn = document.querySelector(".m-btn");
const modalBg = document.querySelector(".m-bg");
const modalClose = document.querySelector(".m-bgclose");

const modalDiv = document.getElementsByClassName("calendar__dates-date");

let todoInput = document.querySelector(".toDo-input");
const todoBtn = document.querySelector(".toDo-add");
const todoList = document.querySelector(".toDo-list");

window.selectedDay = 0;

let allDatesArray = [];

for (let i = 0; i < modalDiv.length; i++) {
  let item = modalDiv[i];

  let listTodo = [];

  allDatesArray.push(listTodo);

  item.addEventListener("click", function () {
    window.selectedDay = Number(item.innerText);
    console.log(window.selectedDay);

    modalBg.classList.add("m-bg__active");
  });
}

console.log(allDatesArray);

todoBtn.addEventListener("click", function () {
  let input = todoInput.value;
  let temp = { todo: input, completed: false };

  allDatesArray[window.selectedDay - 1].push(temp);
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("m-bg__active");

  window.selectedDay = 0;
});

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTask);

function addTodo(event) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const completedBtn = document.createElement("button");
  completedBtn.innerText = "Сделано";
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Удалить";
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);
}

function deleteTask(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
