'use strict';
window.addEventListener('click', StopWatch);

function qs(selector) {
    return document.querySelector(selector);
}

function StopWatch() {
    let timeId = null;
    let currentTime = 0;

    function startTimer() {
        timeId = setInterval(() => {
            currentTime++;
            console.log(`${currentTime} seconds`);
        }, 1000)
    }

    function stopTimer() {
        clearInterval(timeId);
        timeId = null;
    }

    function resetTimer() {
        stopTimer();
        currentTime = 0;
        console.log(`Timer reset to ${currentTime}`);
    }

    qs('#stopwatch').addEventListener('click', () => {
        if (timeId === null) {
            startTimer();
        } else {
            stopTimer();
        }
    })

    qs('#reset').addEventListener('click', resetTimer);

}