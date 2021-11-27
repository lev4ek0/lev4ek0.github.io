class Task {

    constructor(text) {
        this.checkbox = false;
        this.text = text;
    }

}

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
    content.classList.contains('line-through') ? content.classList.remove('line-through') : content.classList.add('line-through')
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(name, checkbox) {
    let checked = checkbox === true ? 'checked' : '';
    task_o.insertAdjacentHTML('afterbegin', '<div class="task">\n' +
        `                    <div class="text ${checked ? 'line-through' : ''}">` + name + '</div>\n' +
        '                    <div class="buttons">\n' +
        '                        <label>\n' +
        '                            <input onclick="inverseCheck(this)" type="checkbox" ' + checked + '>\n' +
        '                        </label>\n' +
        '                        <button onclick="deleteTask(this)">Удалить</button>\n' +
        '                    </div>\n' +
        '                </div>');
}

function enter() {
    let mytext = document.getElementById('task');
    createTask(mytext.value);
    tasks.push(new Task(mytext.value));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    mytext.value = "";
}
