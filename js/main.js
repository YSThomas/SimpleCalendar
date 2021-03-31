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

  // objIndex = objIndex;
  // chtoTo(objIndex);
});

function chtoTo(index) {
  const deleteBtn = document.getElementsByClassName("delete-btn");
  const todoElement = document.querySelector(".todo");
  // for (let i = 0; i < deleteBtn.length; i++) {
  console.log(index);
  deleteBtn[index].addEventListener("click", (e) => {
    // delete allDatesArray[window.selectedDay - 1][i];
    let array = allDatesArray[window.selectedDay - 1];
    array.splice(index, 1);

    console.log(array);

    console.log(index);
  });
  // }
}

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

  // deleteBtn.addEventListener("click", (e) => {
  //   index = index;
  //   console.log(index);
  // });

  btnDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);

  // chtoTo(index);
}

function deleteTask(e) {
  const item = e.target;
  const completedBtn = document.createElement("button");
  let btnText = item.parentElement.innerText;
  let fullText = item.parentElement.parentElement.innerText;
  let replaceText = fullText.replace(btnText, "");

  // let arr = allDatesArray[window.selectedDay - 1];

  // let btnText = item.parentElement.innerText;
  // let fullText = item.parentElement.parentElement.innerText;
  // let replaceText = fullText.replace(btnText, "");
  // console.log(replaceText);

  // const ohBlya = arr.filter((el) => {
  //   return el["todo"].indexOf(replaceText);
  // });
  // console.log(ohBlya);

  // let getIndex = arr["todo"].indexOf(replaceText);

  // chtoTo();
  allDatesArray[window.selectedDay - 1].forEach((obj, i) => {
    console.log(obj);
    if (
      replaceText.replace(/\r?\n/g, "") ==
      allDatesArray[window.selectedDay - 1][i].todo
    ) {
      allDatesArray[window.selectedDay - 1].splice(i, 1);
      console.log("Получилось! Индекс: " + i);
    } else {
      console.log("Снова что-то поломал");
      return;
    }
    // console.log(obj["todo"]);
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

// const deleteBtn = document.getElementsByClassName("delete-btn");

// document.addEventListener("click", function (e) {
//   if (e.target && e.target.className == "delete-btn") {
//     console.log(deleteBtn);

//   }
// });

// for (let i = 0; i < deleteBtn.length; i++) {
// deleteBtn[i].addEventListener("click", (e) => {
//   console.log(e);
// });
// }
