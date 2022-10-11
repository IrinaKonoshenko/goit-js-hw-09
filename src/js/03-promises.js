import Notiflix from 'notiflix';

const inputDelay = document.querySelector('[name=delay]');
const inputStep = document.querySelector('[name=step]');
const inputAmount = document.querySelector('[name=amount]');

const form = document.querySelector('.form');
form.addEventListener('submit', async event => {
  event.preventDefault();

  const delay = parseInt(inputDelay.value);
  const step = parseInt(inputStep.value);
  const amount = parseInt(inputAmount.value);

  for (let i = 1; i <= amount; i++) {
    /**
     * Другой вариант решения
     */
    // try {
    //   const totalDelay = i === 0 ? delay : step;
    //   const res = await createPromise(i, totalDelay)
    //   console.log(`✅ Fulfilled promise ${res.position} in ${res.delay}ms`);
    // } catch(error) {
    //   console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    // }

    createPromise(i, delay + step * (i - 1))
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
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
