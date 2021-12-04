window.addEventListener('load', function() {
    try {
        let header = document.getElementById("header");
        let btns = header.getElementsByClassName("menu");
        for (let i = 0; i < btns.length; i++) {
            if (btns[i].href === window.location.href) {
                btns[i].classList.add("active");
            }
        }
    }
    catch {
        let header = document.getElementById("menu");
        let btns = header.getElementsByClassName("menu");
        for (let i = 0; i < btns.length; i++) {
            if (btns[i].href === window.location.href) {
                btns[i].classList.add("active");
            }
        }
    }
});