const modalBtn = document.querySelector(".m-btn");
const modalBg = document.querySelector(".m-bg");
const modalClose = document.querySelector(".m-bgclose");

const modalDiv = document.getElementsByClassName("calendar__dates-date");

let todoInput = document.querySelector(".toDo-input");
const todoBtn = document.querySelector(".toDo-add");
const todoList = document.querySelector(".toDo-list");
const justTodo = document.querySelectorAll(".todo");

const date = new Date();
const daysDiv = document.querySelector(".day");

date.setDate(1);

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstDayIndex = date.getDay() - 1;
const lastDayIndex = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDay();
const nextDays = 7 - lastDayIndex;

console.log(firstDayIndex);
let days = "";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
for (let x = firstDayIndex; x > 0; x--) {
  days += `<div class='calendar__dates-date prev__date col-'>${
    prevLastDay - x + 1
  }</div>`;
}
for (let i = 1; i <= lastDay; i++) {
  days += `<div class='calendar__dates-date col-'>${i}</div>`;
  daysDiv.innerHTML = days;
}
for (let j = 1; j <= nextDays; j++) {
  days += `<div class='calendar__dates-date next__date col-'>${j}</div>`;
  daysDiv.innerHTML = days;
}

document.querySelector(".calendar__month").innerHTML = months[date.getMonth()];

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
  if (input === "") {
    alert("Поле не должно быть пустым");
    return;
  }
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

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement.parentElement;
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
    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement.parentElement;

    let btnText = item.parentElement.innerText;
    let fullText = item.parentElement.parentElement.innerText;
    let replaceText = fullText.replace(btnText, "");

    allDatesArray[window.selectedDay - 1].forEach((obj, i) => {
      console.log(obj);
      if (
        replaceText.replace(/\r?\n/g, "") ==
          allDatesArray[window.selectedDay - 1][i].todo &&
        allDatesArray[window.selectedDay - 1][i]["completed"] == false
      ) {
        allDatesArray[window.selectedDay - 1][i]["completed"] = true;
      } else if (
        replaceText.replace(/\r?\n/g, "") ==
          allDatesArray[window.selectedDay - 1][i].todo &&
        allDatesArray[window.selectedDay - 1][i]["completed"] == true
      ) {
        allDatesArray[window.selectedDay - 1][i]["completed"] = false;
      }
    });

    todo.classList.toggle("completed");
  }
}
