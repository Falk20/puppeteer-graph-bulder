let showManual = document.querySelector('.show-manual');
let hideManual = document.querySelector('.hide-manual');
console.log('kek')
let manual = document.querySelector('.manual');

function toggleManual() {
  manual.classList.toggle('hide');
  hideManual.classList.toggle('hide');
}

showManual.addEventListener('click', toggleManual);
hideManual.addEventListener('click', toggleManual);
// manual.addEventListener('click', toggleManual);



