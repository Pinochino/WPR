'use strict';

(function () {

    const API_URL = '';

    window.addEventListener('load', init)

    function init() {
        qs('form').addEventListener('submit', login);
    }

    async function login(e) {
        e.preventDefault();

        const avatar = qs('#avatar').value;
        const username = qs('#username').value;
        const password = qs('#password').value;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);

        try {
            const response = fetch(API_URL, {
                method: 'POST',
                body: formData
            })
            await statusCheck(response);
            const data = await response.text();
            displayData(data);

        } catch (error) {
            hanldeError(error);
        }

    }

    function displayData(params) {

    }

    function hanldeError(params) {
        console.error(params)
    }
})();

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

function qs(params) {
    return document.querySelector(params);
}