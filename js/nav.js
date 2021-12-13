let px480 = window.matchMedia( "(max-device-width: 480px)" );
function check() {
    if (px480['matches']) {
        document.getElementById('header').remove()
        console.log('<')
        let slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 350, //width
            'tolerance': 70, //if < 70 slide left else slide right
            'easing': 'cubic-bezier(.32,2,.55,.27)' //smoothness
        });

// Toggle button
        document.querySelector('.toggle-button').addEventListener('click', function () {
            slideout.toggle(); //toggle
        });
    } else {
        console.log('>')
        document.getElementById('mobile').remove()
        document.getElementById('menu').remove()
    }
}

check();
window.onresize = function(){ location.reload(); }
