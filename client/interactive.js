let showManual = document.querySelector('.show-manual');
let hideManual = document.querySelector('.hide-manual');
let manual = document.querySelector('.manual');
let err = document.querySelector('.error');

err.addEventListener('click', (e) => {
  e.currentTarget.classList.add('hide')
});

function toggleManual() {
  manual.classList.toggle('hide');
  hideManual.classList.toggle('hide');
}

showManual.addEventListener('click', toggleManual);
hideManual.addEventListener('click', toggleManual);