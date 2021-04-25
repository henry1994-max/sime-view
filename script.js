let todos = [];
let currentDraggedElement;

downloadFromServer('cards').then(
     function (value) {
        downloadFromServer('users').then(
            async function (value) {
                todos = cards;
                await updateHTML();
            },
            function (error) {
                console.log('problem!!')
            }
        );
    },
    function (error) {
        console.log('problem!!')
    }
);

async function updateHTML() {
    await downloadFromServer('cards');
    await downloadFromServer('users');
    todos=cards;
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

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {
    let index = cards.findIndex(x => x.id == currentDraggedElement);
    log_template.start = cards[index].status;
    cards[index]['status'] = status;
    todos[index]['status'] = status;
    log_template.end = cards[index].status;
    log_template.sort = 'move_card';
    log_template.cardname = cards[index].title;
    await saveJSONToServer('cards'); 
    await addBacklog(log_template);
    await updateHTML();
}

function showDescription(index) {
    document.getElementById(`element-description-${index}`).classList.remove('d-none');
    document.getElementById(`open-img-${index}`).classList.add('d-none');
        document.getElementById(`close-img-${index}`).classList.remove('d-none');
}

function closeDescription(index) {
        document.getElementById(`element-description-${index}`).classList.add('d-none');
        document.getElementById(`open-img-${index}`).classList.remove('d-none');
        document.getElementById(`close-img-${index}`).classList.add('d-none');
}