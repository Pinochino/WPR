'use strict';

window.addEventListener('DOMContentLoaded', CountDown)

function CountDown() {

    const button = document.querySelector('.btn');
    const message = document.querySelector('.message');

    let countDownValue = 5;
    let countDownCurrent;

    const countDownPromise = new Promise((resolve, reject) => {
        countDownCurrent = setInterval(() => {
            message.innerHTML = `Promise resolved in ${countDownValue} seconds`;
            countDownValue--;

            if (countDownValue < 0) {
                message.innerHTML = `Promise has resolved`;
            }
        }, 1000)

        button.addEventListener('click', () => {
            clearInterval(countDownCurrent);
            reject('Promise has failed to resolve');
        })
    })

    countDownPromise.catch(error => {
        message.innerHTML = error;
    })

}