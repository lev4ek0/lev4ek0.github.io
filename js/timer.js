startday = new Date();
clockStart = startday.getTime();

function initStopwatch() {
    let myTime = new Date();
    let timeNow = myTime.getTime();
    let timeDiff = timeNow - clockStart;
    this.diffSecs = timeDiff / 1000;
    return (this.diffSecs);
}

function init() {
    let timeout = setTimeout( function tick (){
        document.getElementById("timer").innerText = "Прошло " + Math.round(initStopwatch()) + " секунд";
        clearTimeout(timeout);
        timeout = setTimeout(tick, 1000);
    }, 1000)
}

init();