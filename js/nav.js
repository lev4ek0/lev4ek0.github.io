let px480 = window.matchMedia( "(max-device-width: 480px)" );
if (px480['matches']) {
    document.getElementById('header').remove()
    console.log('<')
    let slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 300,
        'tolerance': 70,
        'easing': 'cubic-bezier(.32,2,.55,.27)'
    });

// Toggle button
    document.querySelector('.toggle-button').addEventListener('click', function () {
        slideout.toggle();
    });
} else {
    console.log('>')
    document.getElementById('mobile').remove()
    document.getElementById('menu').remove()
}