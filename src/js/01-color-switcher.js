'use strict';

const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);

    startBtn.disabled = false;
    stopBtn.disabled = true;

    // console.log(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}