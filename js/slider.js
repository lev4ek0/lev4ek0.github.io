window.onload = function () {
    let elem = document.querySelector('.main-carousel');
    let flkty = new Flickity(elem, {
        cellAlign: 'left',
        contain: true,
        autoplay: 1000,
        draggable: false,
        wrapAround: true,
        accessibility: false,
        arrowShape: 'M 0,50 L 60,00 L 50,30 L 80,30 L 80,70 L 50,70 L 60,100 Z' //m - move to, l - line to, z - end
    });
}
