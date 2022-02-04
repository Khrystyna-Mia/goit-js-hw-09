import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
// stopBtn.disabled = true;

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return Notify.failure("Please choose a date in the future");
  }
    Notify.success('Data is valid!');
    startBtn.disabled = false;

    userDate = selectedDates[0];
  },
}

class Timer {
  constructor() {
    this.intervalId = null;
    // this.isActive = false;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
  
  start() {
    // if (this.isActive) {
    //   return;
    // }
    const startTime = Data.now();
    // this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDates - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      dataDays.innerHTML = days;
      dataHours.innerHTML = hours;
      dataMinutes.innerHTML = minutes;
      dataSeconds.innerHTML = seconds;
      
      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        startBtn.disabled = true;
        return;
      }

      startBtn.disabled = true;
      stopBtn.disabled = false;
    }, 1000)
  }

   stop() {
      clearInterval(this.intervalId);
      // this.isActive = false;

      startBtn.disabled = true;
      stopBtn.disabled = true;
    }
}

const timer = new Timer();
flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
    timer.start();
});

stopBtn.addEventListener('click', () => {
  timer.stop();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}