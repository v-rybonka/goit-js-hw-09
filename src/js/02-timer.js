import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};
let dateEnd = 0;
const TODAY = new Date();
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates, dateStr, instance) {
    if (selectedDates[0] <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;

      dateEnd = Date.parse(dateStr);
    }
  },
  start() {
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = dateEnd - currentTime;
      const timeComponents = convertMs(deltaTime);
      if (deltaTime >= 0) {
        const values = Object.values(timeComponents);
        refs.spanDays.textContent = values[0];
        refs.spanHours.textContent = values[1];
        refs.spanMinutes.textContent = values[2];
        refs.spanSeconds.textContent = values[3];
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  },
};

refs.btnStart.addEventListener('click', () => {
  options.start();
  refs.btnStart.disabled = true;
});

flatpickr(refs.inputEl, options);

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
