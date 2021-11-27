class Task {

    constructor(text) {
        this.checkbox = false;
        this.text = text;
    }

}

let task_o = document.getElementById("task_o")
let input = document.getElementById("task");
let tasks = [];
tasks = JSON.parse(localStorage.getItem('tasks'))

if (tasks === null) {
    tasks = []
} else {
    tasks.forEach(el => createTask(el.text, el.checkbox))
}

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
        content.classList.remove('line-through')
        content.parentNode.classList.remove('completed')
    } else {
        content.classList.add('line-through')
        content.parentNode.classList.add('completed')
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function setNumber(number, text) {
    return number + ". " + text
}

function createTask(name, checked) {

    let template = document.getElementById('template').content.cloneNode(true);
    let text = template.getElementById('text');
    text.innerText = name

    let checkbox = template.getElementById('inverse');
    if (checked) {
        checkbox.setAttribute('checked','');
        text.classList.add('line-through')
        text.parentNode.classList.add('completed')
    }
    task_o.appendChild(template);
}

function enter() {
    let mytext = document.getElementById('task');
    createTask(setNumber(tasks.length, mytext.value));
    tasks.push(new Task(setNumber(tasks.length, mytext.value)));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    mytext.value = "";
}
