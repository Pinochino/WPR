'use strict';

window.addEventListener('load', getGenres);
window.addEventListener('load', init);


function init() {
    const button = qs('#btn');
    button.addEventListener('click', getGames);
}


function getGenres() {
    const API = `http://localhost:3000/game/genres`;
    fetch(API)
        .then(statusCheck)
        .then(data => data.json())
        .then(res => displayGenres(res))
        .catch(err => handleError(err));
}

function getGames(event) {
    event.preventDefault();
    const yearInput = document.getElementById('year').value;
    const genreNameInput = document.getElementById('genres').value;

    const API = `http://localhost:3000/games/list/${genreNameInput}/${yearInput}`
    fetch(API)
        .then(statusCheck)
        .then(data => data.json())
        .then(res => {
            console.log(res)
            displayGames(res)
        })
        .catch(err => handleError(err))
}

function displayGenres(data) {
    const selectGenre = id('genres');
    selectGenre.innerHTML = '';

    const option = document.createElement('option');
    option.textContent = 'Please enter options';
    option.value = '';
    selectGenre.appendChild(option);


    data.forEach((item) => {
        if (item && item.genre_name) {
            const option = document.createElement('option');
            option.textContent = item.genre_name;
            option.value = item.genre_name.toLowerCase();
            selectGenre.appendChild(option);
        } else {
            console.warn('Dữ liệu không hợp lệ:', item);
        }
    });
}

function displayGames(data) {
    const tBody = id('table-body');
    tBody.innerHTML = '';

    data.forEach((item) => {
        if (item || item.id || item.name || item.platform || item.publisher) {
            const cellId = document.createElement('td');
            cellId.innerHTML = item.id;
            tBody.appendChild(cellId);

            const cellName = document.createElement('td');
            cellName.innerHTML = item.name;
            tBody.appendChild(cellName);

            const cellPlatform = document.createElement('td');
            cellPlatform.innerHTML = item.platform;
            tBody.appendChild(cellPlatform);

            const cellPublisher = document.createElement('td');
            cellPublisher.innerHTML = item.publisher;
            tBody.appendChild(cellPublisher);

        } else {
            console.warn('Dữ liệu không hợp lệ:', item);
        }
    });
}


function handleError(error) {
    if (error) {
        console.error(error);
    }
    return error;
}

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text())
    }
    return res;
}



function qs(params) {
    return document.querySelector(params);
}

function qsa(params) {
    return document.querySelectorAll(params);
}

function id(params) {
    return document.getElementById(params);
}

