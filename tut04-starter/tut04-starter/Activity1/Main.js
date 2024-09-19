'use strict';

window.addEventListener('DOMContentLoaded', getPromise);

function getPromise(resolve, reject) {
    console.log('Pending');
    setTimeout(function () {
        resolve('Promise one is done!')
    }, 5000)

}
function displayResult(value) {
    console.log(value);
}
let promise = new Promise(getPromise);
promise.then(displayResult)
// .then(function() {
//     console.log('Final done!');
// })

// async function getPromise() {
//     return 'Promise one is done!';
// }
// console.log('Pending ....');
// setTimeout((async function () {
//     let result = await getPromise();
//     console.log(result);
// }), 5000)

