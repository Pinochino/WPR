document.querySelector('#myBtn').addEventListener('click', function () {
    const toggle = document.querySelector('.toggle');
    if (!toggle.classList.contains('open')) {
        toggle.classList.add('open');
    }
});
document.addEventListener('click', function (event) {
    const toggle = document.querySelector('.toggle');
    if (!toggle.contains(event.target) && event.target.id !== 'myBtn') {
        toggle.classList.remove('open')
    }
})