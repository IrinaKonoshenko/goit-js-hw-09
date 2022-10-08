import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
import '../sass/_02-timer.scss'; /// почему-то не хочет работать импорт в index.scss

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let currentValue = null;
let interval = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() > selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
      return;
    }
    btnStart.removeAttribute('disabled');
    currentValue = selectedDates[0];
  },
});
const onClick = () => {
  input.setAttribute('disabled', true);
  btnStart.setAttribute('disabled', true);
  calculate();
  interval = setInterval(calculate, 1000);
};

function calculate() {
  const ms = currentValue.getTime() - new Date().getTime();
  let time = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };
  if (ms < 0) {
    clearInterval(interval);
    input.removeAttribute('disabled');
  } else {
    time = convertMs(ms);
  }
  days.innerHTML = addLeadingZero(time.days);
  hours.innerHTML = addLeadingZero(time.hours);
  minutes.innerHTML = addLeadingZero(time.minutes);
  seconds.innerHTML = addLeadingZero(time.seconds);
}

btnStart.addEventListener('click', onClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.length > 2 ? stringValue : stringValue.padStart(2, '0');
}
