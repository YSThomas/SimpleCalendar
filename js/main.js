//modal

const modalBtn = document.querySelector('.m-btn');
const modalBg = document.querySelector('.m-bg');
const modalClose = document.querySelector('.m-bgclose');

const modalDiv = document.querySelectorAll('.calendar__dates-date');


Array.from(modalDiv).forEach(link => {
    link.addEventListener('click', function(event) {
		
		modalBg.classList.add('m-bg__active');
		console.log(this);
		
    });
});


const todoInput = document.querySelector('.toDo-input');
const todoBtn = document.querySelector('.toDo-add');
const todoList = document.querySelector('.toDo-list');

modalBtn.addEventListener('click', function() {
	modalBg.classList.add('m-bg__active');
})

modalClose.addEventListener('click', function() {
	modalBg.classList.remove('m-bg__active');
})

todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTask);

function addTodo(event){
	console.log('222');
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");

	todoDiv.appendChild(newTodo);

	const completedBtn = document.createElement('button');
	completedBtn.innerText = "Сделано";
	completedBtn.classList.add('complete-btn');
	todoDiv.appendChild(completedBtn);

	const deleteBtn = document.createElement('button');
	deleteBtn.innerText = "Удалить";
	deleteBtn.classList.add('delete-btn');
	todoDiv.appendChild(deleteBtn);

	todoList.appendChild(todoDiv)

	todoInput.value = '';
}

function deleteTask(e) {
	const item = e.target;

	if(item.classList[0] === 'delete-btn'){
		const todo = item.parentElement;
		todo.remove();
	}

	if(item.classList[0] === 'complete-btn'){
		const todo = item.parentElement;
		todo.classList.toggle('completed')
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