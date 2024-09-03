"use strict";
window.addEventListener('load', showCard);

function showCard() {
    const container = document.querySelector('.images');
    const array = ['./images/10C.png', './images/10D.png', './images/3H.png', './images/QD.png', './images/KC.png'];

    for (let i = 0; i < array.length; i++) {
        const image = document.createElement('img');
        image.setAttribute('src', array[i]);
        container.appendChild(image);

        image.addEventListener('click', () => {
            // Reset the size of all images
            const allImages = container.querySelectorAll('img');
            allImages.forEach(img => {
                img.style.height = ''; // Reset height
            });

            // Enlarge the clicked image
            image.style.height = '300px';
        });
    }
}
