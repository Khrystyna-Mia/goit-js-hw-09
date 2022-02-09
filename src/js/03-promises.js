import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', promiseSubmit);

function promiseSubmit(evt) {
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;

    let delay = Number(formElements.delay.value);
    let step = Number(formElements.step.value);
    let amount = Number(formElements.amount.value);

    for (let position = 1; position <= amount; position ++) {
            delay += step;

        createPromise(position, delay)
            .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
            .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                // Fulfill
                resolve({ position, delay });
            } else {
                // Reject
                reject({ position, delay });
            }
        }, delay);
    });
}

// function promiseSubmit(evt) {
//     evt.preventDefault();

//     let [delay, step, amount] = evt.currentTarget.elements;
//     delay = Number(delay.value);
//     step = Number(step.value);
//     amount = Number(amount.value);

//     for (let position = 1; position <= amount; position ++) {
//         // if (position < 1) {
//         //     delay += step;
//         // }
         
//         // createPromise(position, delay)
//         //     .then(({ position, delay }) => {
//         //         setTimeout(() => {
//         //             Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         //         }, delay);
//         //     })
//         //     .catch(({ position, delay }) => {
//         //         setTimeout(() => {
//         //             Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         //         }, delay);
//         //     });
//         delay += step;
//     }
// }
 
