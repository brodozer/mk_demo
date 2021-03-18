const modal = document.querySelector('.modal');
const btnWatch = document.querySelector('.btn-watch');
const btnClose = document.querySelector('.btn-close');

btnWatch.addEventListener('click', () => {
    modal.classList.add('modal-open');
})

btnClose.addEventListener('click', () => {
    modal.classList.remove('modal-open');
    modal.querySelector('video').pause();
})