import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let intervalId = null;
let selectDate = 0;

startBtn.disabled = true;
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  /* В методе onClose() обрабатываем дату выбранную пользователем: 
/   если пользователь не выбрал дату в будущем - failure, если верная дата - success*/

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate) {
      return Notify.failure('Please choose a date in the future');

    } else {
      Notify.success('The selected date is valid!');
    }

    startBtn.disabled = false;
    selectDate = selectedDates[0].getTime();

    let deltaTime = selectDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    updateTimer({ days, hours, minutes, seconds });
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${ days }`;
    dataHours.textContent = `${ hours }`;
    dataMinutes.textContent = `${ minutes }`;
    dataSeconds.textContent = `${ seconds }`;
}

function start() {
  let deltaTime = 0;

  intervalId = setInterval(() => {
    deltaTime = selectDate - Date.now();

    if (deltaTime <= 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimer({ days, hours, minutes, seconds });
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function stop() {
  const time = convertMs(0);
  clearInterval(intervalId);

  updateTimer(time);
  calendar.setDate(Date.now());

  startBtn.disabled = true;
}

const calendar = flatpickr('#datetime-picker', options);

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



// let selectedDate = null;
// let intervalId = null;
// startBtn.disabled = true;

// startBtn.addEventListener('click', start);
// stopBtn.addEventListener('click', stop);

// /* Вторым аргументом функции flatpickr(selector, options) передаем необязательный объект параметров. */

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   /* В методе onClose() обрабатываем дату выбранную пользователем: 
//   если пользователь не выбрал дату в будущем - failure, если верная дата - success*/

//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       return Notify.failure('Please choose a date in the future');

//     } else {
//       Notify.success('The selected date is valid!');

//       startBtn.disabled = false;
//       selectedDate = selectedDates[0].getTime();
//     }
//   },
// };

// const calendar = flatpickr('#datetime-picker', options);

// /* Запускаем/останавливаем таймер */

// function start() {
//   const startTime = selectedDate;

//   intervalId = setInterval(() => {
//     const currentTime = Date.now();
//     const deltaTime = startTime - currentTime;

//     const { days, hours, minutes, seconds } = convertMs(deltaTime);

//     if (deltaTime < 0) {
//       clearInterval(intervalId);
//     }

//     startBtn.disabled = true;

//     updateTimer({ days, hours, minutes, seconds });
//   }, 1000);
// }

// /* Останавливаем/очищаем таймер */

// function stop() {
//   startBtn.disabled = true;

//   clearInterval(intervalId);
  
//   // calendar.setDate(Date.now());

//   // dataDays.textContent = '00';
//   // dataHours.textContent = '00';
//   // dataMinutes.textContent = '00';
//   // dataSeconds.textContent = '00';

//   // // const time = convertMs(0);
//   // // updateTimer(time);

// }

// /* Выбираем время */

// function updateTimer({ days, hours, minutes, seconds }) {
//     dataDays.textContent = `${ days }`;
//     dataHours.textContent = `${ hours }`;
//     dataMinutes.textContent = `${ minutes }`;
//     dataSeconds.textContent = `${ seconds }`;
// }

// /* Перед отрисовкой интефрейса форматируем значение. */

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// /* Для подсчета значений используем функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах. */
// /* Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. */

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }
