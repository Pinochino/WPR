'use strict';

window.addEventListener('DOMContentLoaded', init)


async function getCountry(params) {
    const url = `https://jsonplaceholder.typicode.com/comments`;
    try {
       const response = await fetch(url)
       if (!response.ok) {
        console.log(`Http error!: ${response.status}` );
       }
   } catch (error) {
    console.error(error);
    return [];
   }  
}

function displayCountry(object){
    const ul = document.querySelector('.wrapper');

    const li = document.createElement('li');
    ul.appendChild(li);
    data.array.forEach(element => {
        li.textContent = element;
    });
}



function init() {
}
