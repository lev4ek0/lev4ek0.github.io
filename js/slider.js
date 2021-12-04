let elem = document.querySelector('.main-carousel');
let flkty = new Flickity( elem, {
    cellAlign: 'left',
    contain: true,
    autoplay: 1000,
    draggable: false,
    wrapAround: true,
    accessibility: false,
});


// прокручивание автоматически
window.onload = function () {
    flkty.playPlayer();
}
