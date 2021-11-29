function randomize(data){
    let response = []
    for (let i = 0; i < data.length; i++) {
        if (Math.floor(Math.random() * 20) === 0){
            response.push(data[i]);
        }
    }
    return response
}

localStorage.clear()

function serialize(data){
    let response = []
    for (let i = 0; i < data.length; i++) {
        response.push(new Task(i + 1 + '. ' + data[i]['title'], data[i]['completed']));
    }
    return response;
}

window.onload = async function () {
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        json = randomize(json);
        tasks = serialize(json);
    } else {
        window.setTimeout(function () {
            document.getElementById('none').setAttribute('id', 'error');
        }, 500);
    }
    document.getElementById('wait').classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.getElementById('wait').classList.add('loaded');
        document.getElementById('wait').classList.remove('loaded_hiding');
        allTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, 500);
}