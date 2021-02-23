//modal
let modalBtn = document.querySelector('.m-btn');
let modalBg = document.querySelector('.m-bg');
let modalClose = document.querySelector('.m-bgclose');

modalBtn.addEventListener('click',function() {
	modalBg.classList.add('m-bg__active');
})

modalClose.addEventListener('click', function() {
	modalBg.classList.remove('m-bg__active');
})


//let modalBtn = document.querySelector('div.calendar__dates-date');

/*
let mDiv = document.querySelectorAll('.calendar__dates-date').forEach(mDiv => {
  mDiv.addEventListener('click', event => {
    
  })
})
*/

let mDiv = document.querySelectorAll('.calendar__dates-date').forEach(mDiv => {
	mDiv.addEventListener('click', function() {
		let modalBtn = document.querySelector('div');
		let modalBg = document.querySelector('.m-bg');
		let modalClose = document.querySelector('.m-bgclose');

		modalBtn.addEventListener('click',function() {
			modalBg.classList.add('m-bg__active');
		})

		modalClose.addEventListener('click', function(e) {
			e.stopPropagation();
			modalBg.classList.remove('m-bg__active');
			console.log('close');
		})
	console.log(this);
  })
})