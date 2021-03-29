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

    let arrayItems = allDatesArray[window.selectedDay - 1].reduce(
      (result, item) => {
        result += `
        <div class="todo"><li class="todo-item">
      ${item["todo"]}
      </li>
      <button class="complete-btn">Сделано</button><button class="delete-btn">Удалить</button></div>
        `;
        console.log(item);
        return result;
      },
      ""
    );

    todoList.innerHTML = arrayItems;

    // for (let j = 0; j < window.selectedDay; j++) {
    //   let out = "";
    //   out += `
    // <div class="todo"><li class="todo-item">
    // ${allDatesArray[window.selectedDay - 1][0]["todo"]}
    // </li>
    // <button class="complete-btn">Сделано</button><button class="delete-btn">Удалить</button></div>`;
    //   todoList.innerHTML = out;
    // }
  });
}

console.log(allDatesArray);

todoBtn.addEventListener("click", function (e) {
  let input = todoInput.value;
  let temp = { todo: input, completed: false };
  let objIndex = allDatesArray[window.selectedDay - 1].length;

  allDatesArray[window.selectedDay - 1].push(temp);
  addTodo(e, objIndex);
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("m-bg__active");
});

// todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTask);

function addTodo(event, index) {
  // allDatesArray[window.selectedDay - 1];

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = allDatesArray[window.selectedDay - 1][index]["todo"];
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
