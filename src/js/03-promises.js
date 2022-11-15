import Notiflix from 'notiflix';

const form = document.querySelector('form');

form.addEventListener('submit', generatePromises);

function generatePromises(e) {
  e.preventDefault();

  const formElms = e.currentTarget.elements;
  const step = formElms.step.value;
  const firstDelay = formElms.delay.value;
  let currentDelayForTimeOut = Number(firstDelay);
  let currentDelay = Number(firstDelay);

  for (let i = 1; i <= formElms.amount.value; i++) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        if (shouldResolve) {
          res({ position: i, delay: currentDelay });
          currentDelay += Number(step);
        } else {
          rej({ position: i, delay: currentDelay });
          currentDelay += Number(step);
        }
      }, currentDelayForTimeOut);
    });

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    currentDelayForTimeOut += Number(step);
  }
}
