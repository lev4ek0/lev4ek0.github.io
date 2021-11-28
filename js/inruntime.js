class Task {

    constructor(text) {
        this.checkbox = false;
        this.text = text;
    }
}

let cond;

let tmp = document.getElementById('template');
const btn = document.querySelector('#none');

btn.addEventListener('mouseenter', () => {
    btn.style.top = `${Math.random() * 500 + 135}px`;
})

let task_o = document.getElementById("task_o");
let input = document.getElementById("task");
let tasks;

function start() {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    cond = JSON.parse(localStorage.getItem('cond'));
    if (cond===null){
        cond = 0;
    }
    if (tasks === null) {
        tasks = [];
    } else {
        tasks.forEach(el => createTask(el.text, el.checkbox));
    }
}

start()

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("task").click();
    }
});

function deleteTask(el){
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
    let content = el.parentNode.parentNode.childNodes[1].textContent;
    let l = tasks.length;
    while(l--){
        if(tasks[l].text === content) {
            tasks.splice(l, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function inverseCheck(el) {
    let content = el.parentNode.parentNode.parentNode.childNodes[1];
    let l = tasks.length;
    while(l--){
        if(tasks[l].text === content.textContent) {
            tasks[l].checkbox = !tasks[l].checkbox;
        }
    }
    if (content.classList.contains('line-through')) {
        content.classList.remove('line-through');
        content.parentNode.classList.remove('completed');
    } else {
        content.classList.add('line-through');
        content.parentNode.classList.add('completed');
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function setNumber(number, text) {
    return number + ". " + text;
}

function isElementInViewport (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function areElementsInViewpoint () {
    let state = true
    document.querySelectorAll('.task_q').forEach(el => state = isElementInViewport(el) && state);
    return state
}

function createTask(name, checked) {

    let template = tmp.content.cloneNode(true);
    let text = template.getElementById('text');
    text.innerText = name;

    let checkbox = template.getElementById('inverse');
    if (checked) {
        checkbox.setAttribute('checked','');
        text.classList.add('line-through');
        text.parentNode.classList.add('completed');
    }

    if (cond === 0){
        task_o.appendChild(template);
    } else if (cond === 1) {
        tmp.parentNode.insertBefore(template, tmp.nextSibling);
    } else if (cond === 2) {
        if (Math.floor(Math.random() * 2) === 0) {
            task_o.appendChild(template);
        } else {
            tmp.parentNode.insertBefore(template, tmp.nextSibling);
        }
    }

    if (!areElementsInViewpoint() && Math.floor(Math.random() * 4) === 0) {
        alert('Зачем ты меня пытаешься сломать?((')
    }
}

function getNumber(number) {
    return parseInt(number.split(".")[0]);
}

function enter() {
    let mytext = document.getElementById('task');
    let number = "";
    try {
        number = Math.max(getNumber(tasks[tasks.length - 1].text), getNumber(tasks[0].text));
    } catch {}
    createTask(setNumber(number + 1, mytext.value));
    tasks.push(new Task(setNumber(number + 1, mytext.value)));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    mytext.value = "";
}

function show(){
    let copy = JSON.stringify(tasks);
    document.querySelectorAll('.task_q').forEach(el => deleteTask(el));
    localStorage.setItem('tasks', copy);
    start();
}

function sortUp(){
    cond = 0;
    localStorage.setItem('cond', '0');
    show()
}

function sortDown(){
    cond = 1;
    localStorage.setItem('cond', '1');
    show()
}

function random() {
    cond = 2;
    localStorage.setItem('cond', '2');
    let copy = JSON.stringify(tasks);
    document.querySelectorAll('.task_q').forEach(el => deleteTask(el));
    localStorage.setItem('tasks', copy);
    start();
}
function check(){
    let copy = JSON.stringify(tasks);
    document.querySelectorAll('.task_q').forEach(el => el.parentNode.childNodes[1].childNodes[1].getAttribute('checked') === null ? deleteTask(el) : {});
    localStorage.setItem('tasks', copy);
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function notCheck(){
    let copy = JSON.stringify(tasks);
    document.querySelectorAll('.task_q').forEach(el => el.parentNode.childNodes[1].childNodes[1].getAttribute('checked') !== null ? deleteTask(el) : {});
    localStorage.setItem('tasks', copy);
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function allTasks(){
    show()
}
