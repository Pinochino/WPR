"use strict";
window.addEventListener('load', showCard);

function showCard() {
    const container = document.querySelector('.images');
    const array = ['./images/10C.png', './images/10D.png', './images/3H.png', './images/QD.png', './images/KC.png'];

    for (let i = 0; i < array.length; i++) {
        const image = document.create
        
        Element('img');
        image.setAttribute('src', array[i]);
        container.appendChild(image);

        image.addEventListener('click', () => {
            // Reset the size of all images
            const allImages = container.querySelectorAll('img');
            allImages.forEach(img => {
                img.style.height = '';
            });

            // Enlarge the clicked image
            image.style.height = '300px';
        });
    }
}

// (function() {
//     window.addEventListener('click', init);
//     let array = [
//         './images/10C.png','./images/2C.png', './images/2D.png', './images/3D.png', './images/QD.png'
//     ]

//     function init() {
//         for (let index = 0; index < array.length; index++) {
//             const image = document.createElement('img');
//             image.src = array[index]
//             let container = document.querySelector('.images');
//             container.appendChild(image);
//             image.addEventListener('click',function(){
//                 let changed = image.classList.contains('enlarged');
//                 let images = document.querySelectorAll('img')

//                 images.forEach((function(image)  {
//                     image.classList.remove('enlarged');
//                 }))
//                 if (!changed) {
//                     image.classList.add('enlarged');
//                 }
//             } )
//         }
//     }
// })()