window.addEventListener('load', function() {
    let header = document.getElementById("header");
    let btns = header.getElementsByClassName("menu");
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].href === window.location.href) {
            btns[i].classList.add("active");
        }
    }
});