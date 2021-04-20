let todos = [];

downloadFromServer('cards').then(
    function (value) {
        todos = cards;
        updateHTML();
    },
    function (error) { 
        console.log('problem!!') 
    }
);



let currentDraggedElement;

function updateHTML() {
    let to_do = todos.filter(t => t['status'] == 'to_do');
    document.getElementById('to_do').innerHTML = '';

    for (let index = 0; index < to_do.length; index++) {
        const element = to_do[index];
        document.getElementById('to_do').innerHTML += generateToDoHTML(element);
    }


    let in_progress = todos.filter(t => t['status'] == 'in_progress');
    document.getElementById('in_progress').innerHTML = '';

    for (let index = 0; index < in_progress.length; index++) {
        const element = in_progress[index];
        document.getElementById('in_progress').innerHTML += generateToDoHTML(element);
    }


    let testing = todos.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = '';

    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('testing').innerHTML += generateToDoHTML(element);
    }


    let done = todos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateToDoHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateToDoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo-card">
        <div class="card-title">
            <div id="todo-title">${element['title']}</div>
            <div onclick="deleteSingleCard(${element['id']})" id="delete"><img src="./img/trash.png"></div>
        </div>
        <div id="element-category">${element['category']}</div>
        <div id="element-urgency">${element['urgency']}</div>
        <div id="element-date">${element['date']}</div>
        </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    let index = cards.findIndex(x => x.id == currentDraggedElement);
    todos[index]['status'] = status;
    updateHTML();
    saveJSONToServer('cards');
}