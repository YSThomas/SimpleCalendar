//modal

const modalBtn = document.querySelector(".m-btn");
const modalBg = document.querySelector(".m-bg");
const modalClose = document.querySelector(".m-bgclose");

const modalDiv = document.getElementsByClassName("calendar__dates-date");

let todoInput = document.querySelector(".toDo-input");
const todoBtn = document.querySelector(".toDo-add");
const todoList = document.querySelector(".toDo-list");

for (let i = 0; i < modalDiv.length; i++) {
  let item = modalDiv[i];

  let listTodo = [];

  item.addEventListener("click", function () {
    console.log(item);

    modalBg.classList.add("m-bg__active");

    todoBtn.addEventListener("click", function () {
      let input = todoInput.value;
      let temp = {};
      temp.todo = input;
      temp.completed = false;

      let i = listTodo.length;
      //listTodo[i] = temp;
      listTodo.splice(i, 0, temp);
    });
    console.log(listTodo);
  });
}

/*
for(let i=0;i<modalDiv.length;i++){
    modalDiv[i].addEventListener('click', function(e) {
    	console.log(modalDiv);
    })
}


Array.from(modalDiv).forEach((link) => {
  link.addEventListener("click", function (event) {
    modalBg.classList.add("m-bg__active");
  });
  //lol
});
*/
modalClose.addEventListener("click", function () {
  modalBg.classList.remove("m-bg__active");
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

//let modalBtn = document.querySelector('div.calendar__dates-date');

/*
let mDiv = document.querySelectorAll('.calendar__dates-date').forEach(mDiv => {
  mDiv.addEventListener('click', event => {
    
  })
})
*/

/*
let mDiv = document.querySelectorAll('div').forEach(mDiv => {
	mDiv.addEventListener('click', function() {
 	let modalBtn = document.querySelector('.calendar__dates-date');
 	let modalBg = document.querySelector('.m-bg');
	let modalClose = document.querySelector('.m-bgclose');

		modalBtn.addEventListener('click',function() {
			modalBg.classList.add('m-bg__active');
			console.log(this);
		})

		modalClose.addEventListener('click', function(e) {
			e.stopPropagation();
			modalBg.classList.remove('m-bg__active');
			console.log('close');
		})
	
  })
})
*/
