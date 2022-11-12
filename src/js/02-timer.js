import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
let selectDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  maxDate: new Date().fp_incr(99),
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    btnStart.removeAttribute('disabled');
    selectDate = selectedDates[0];
  },
});

btnStart.addEventListener('click', onStartTimer, { once: true });

function onStartTimer() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();

    if (currentTime > selectDate) {
      clearInterval(intervalId);
      return Notiflix.Notify.info('Time is up!');
    }

    const deltaTime = selectDate - currentTime;

    const timeObj = convertMs(deltaTime);

    const keysOfTimeObj = Object.keys(timeObj);
    for (const key of keysOfTimeObj) {
      const numEl = document.querySelector(`[data-${key}]`);

      numEl.textContent = timeObj[key];
    }
  }, 1000);
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
