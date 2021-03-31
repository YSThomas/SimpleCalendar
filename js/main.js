const modalBtn = document.querySelector(".m-btn");
const modalBg = document.querySelector(".m-bg");
const modalClose = document.querySelector(".m-bgclose");

const modalDiv = document.getElementsByClassName("calendar__dates-date");

let todoInput = document.querySelector(".toDo-input");
const todoBtn = document.querySelector(".toDo-add");
const todoList = document.querySelector(".toDo-list");

window.selectedDay = 0;

let allDatesArray = JSON.parse(localStorage.getItem("testtodos"));

if (!allDatesArray) {
  allDatesArray = [];

  for (let i = 0; i < modalDiv.length; i++) {
    let listTodo = [];
    allDatesArray.push(listTodo);
  }
}

for (let i = 0; i < modalDiv.length; i++) {
  let item = modalDiv[i];
  item.addEventListener("click", function (e) {
    window.selectedDay = Number(item.innerText);
    console.log(window.selectedDay);

    modalBg.classList.add("m-bg__active");

    let arrayItems = allDatesArray[window.selectedDay - 1].reduce(
      (result, item) => {
        result += `
        <div class="todo"><li class="todo-item">
      ${item["todo"]}
      </li>
      <div>
        <button class="complete-btn">Сделано</button>
        <button class="delete-btn">Удалить</button></div>
      </div>
        `;
        return result;
      },
      ""
    );

    todoList.innerHTML = arrayItems;
  });
}

console.log(allDatesArray);

todoBtn.addEventListener("click", function (e) {
  let input = todoInput.value;
  let temp = { todo: input, completed: false };
  let objIndex = allDatesArray[window.selectedDay - 1].length;

  allDatesArray[window.selectedDay - 1].push(temp);

  localStorage.setItem("testtodos", JSON.stringify(allDatesArray));

  addTodo(e, objIndex);
  todoInput.value = "";
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
  const btnDiv = document.createElement("div");
  todoDiv.appendChild(btnDiv);
  const completedBtn = document.createElement("button");
  completedBtn.innerText = "Сделано";
  completedBtn.classList.add("complete-btn");
  btnDiv.appendChild(completedBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Удалить";
  deleteBtn.classList.add("delete-btn");

  btnDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);
}

function deleteTask(e) {
  const item = e.target;
  const completedBtn = document.createElement("button");
  let btnText = item.parentElement.innerText;
  let fullText = item.parentElement.parentElement.innerText;
  let replaceText = fullText.replace(btnText, "");

  allDatesArray[window.selectedDay - 1].forEach((obj, i) => {
    console.log(obj);
    if (
      replaceText.replace(/\r?\n/g, "") ==
      allDatesArray[window.selectedDay - 1][i].todo
    ) {
      allDatesArray[window.selectedDay - 1].splice(i, 1);
      console.log("Получилось! Индекс: " + i);
      localStorage.setItem("testtodos", JSON.stringify(allDatesArray)); // сохранение
    } else {
      console.log("Снова что-то поломал");
      return;
    }
  });

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement.parentElement;

    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  }
}
