class Task {

    constructor(text, completed = false) {
        this.checkbox = completed;
        this.text = text;
    }
}

let cond;

let tmp = document.getElementById('template');

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
    while (l--) {
        if (tasks[l].text === content.textContent) {
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
}

function getNumber(number) {
    return parseInt(number.split(".")[0]);
}

async function enter() {
    document.querySelector('.none').setAttribute("disabled", "")
    document.querySelector('.loaded').setAttribute("class", "preloader")
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let response = await fetch(url);
    let task;
    let vari = [];
    if (response.ok) {
        let json = await response.json();
        vari = randomize(json);
        for (let i = 0; i < json.length; i++) {
            vari.push(new Task(vari[i]['title'], vari[i]['completed']));
        }
        task = vari[0];
    } else {
        window.setTimeout(function () {
            document.getElementById('none').setAttribute('id', 'error');
        }, 500);
    }
    document.getElementById('wait').classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.getElementById('wait').classList.add('loaded');
        document.getElementById('wait').classList.remove('loaded_hiding');
        let value;
        try {
            value = Math.max(getNumber(tasks[0].text), getNumber(tasks[tasks.length - 1].text))
        } catch (TypeError){
            value = 0
        }
        createTask(value + 1 + ". " + task.title, task['completed'])
        tasks.push(new Task(value + 1 + ". " + task.title, task['completed']))
        localStorage.setItem('tasks', JSON.stringify(tasks))
        document.querySelector('.none').removeAttribute("disabled")
    }, 500);
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
    document.querySelectorAll('.fas').forEach(el => el.classList.remove("lookup"))
    document.querySelectorAll('.fas')[0].classList.add("lookup")
    show()
}

function sortDown(){
    cond = 1;
    localStorage.setItem('cond', '1');
    document.querySelectorAll('.fas').forEach(el => el.classList.remove("lookup"))
    document.querySelectorAll('.fas')[1].classList.add("lookup")
    show()
}

function random() {
    cond = 2;
    localStorage.setItem('cond', '2');
    let copy = JSON.stringify(tasks);
    document.querySelectorAll('.task_q').forEach(el => deleteTask(el));
    localStorage.setItem('tasks', copy);
    document.querySelectorAll('.fas').forEach(el => el.classList.remove("lookup"))
    document.querySelectorAll('.fas')[2].classList.add("lookup")
    start();
}
function check(){
    let copy = JSON.stringify(tasks);
    show()
    document.querySelectorAll('.task_q').forEach(el => el.parentNode.childNodes[1].childNodes[1].getAttribute('checked') === null ? deleteTask(el) : {});
    localStorage.setItem('tasks', copy);
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function notCheck(){
    let copy = JSON.stringify(tasks);
    show()
    document.querySelectorAll('.task_q').forEach(el => el.parentNode.childNodes[1].childNodes[1].getAttribute('checked') !== null ? deleteTask(el) : {});
    localStorage.setItem('tasks', copy);
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function allTasks(){
    show()
}
