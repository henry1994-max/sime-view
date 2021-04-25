let card_template = {
    id: '',
    title: '',
    date: '',
    category: '',
    urgency: '',
    description: '',
    assigned_to: [],
    status: 'to_do'
}
let board_on_refresh = true;

async function loadBoard() {
    
    await loadAll();
    await updateHTML();
    startBoardRefresh();
}

function dialogVis() {

    document.getElementById('dialog-bg').classList = 'dialog-bg';
    updateAssignedToSelection();
    card_template.assigned_to = [];
}


async function addCard() {
    let card = {};
    fillCardTemplate();
    card = card_template;
    log_template.sort = 'new_card';
    log_template.cardname = card.title;
    await addCardToServer(card);
    await addBacklog(log_template);
    document.getElementById('dialog-bg').classList = 'dialog-bg d-none';
    location.reload();
}

function generateCardId() {
    for (let i = 0; i <= cards.length; i++) {
        let index = cards.findIndex(x => x.id == i);
        if (index == -1) {
            card_template.id = i;
        }
    }
}


function fillCardTemplate() {
    generateCardId();
    card_template.title = document.getElementById('title').value;
    card_template.date = document.getElementById('date').value;
    card_template.category = document.getElementById('category').value;
    card_template.urgency = document.getElementById('urgency').value;
    card_template.description = document.getElementById('description').value;
}

async function deleteSingleCard(id) {
    let index = cards.findIndex(x => x.id == id);
    log_template.sort = 'delete_card';
    log_template.cardname = cards[index].title;
    await addBacklog(log_template);
    if (index != -1) {
        console.log(index);
        cards.splice(index, 1);
        todos = cards;
        await saveJSONToServer('cards');
        updateHTML();
    }

}

function updateAssignedToSelection() {
    let list = document.getElementById('assigned_to');
    let origin_len = list.length;
    for (let k = 0; k < users.length; k++) {
        let option = document.createElement("option");
        option.text = users[k].name;
        option.value = users[k].id;
        list.add(option);
    }
    for (let i = 1; i < origin_len; i++) {
        list.remove(1);
    }
    updateAssignedToSelectionHTML([]);
}

function addAssignedTo() {
    let user_id = document.getElementById('assigned_to').value;
    if (user_id != 'choose user' && !card_template.assigned_to.includes(user_id)) {
        card_template.assigned_to.push(user_id);
        updateAssignedToSelectionHTML(card_template.assigned_to);
    }
}


function startBoardRefresh() {
    board_on_refresh = true;
    boardRefresh();
}

function endBoardRefresh() {
    backlog_on_refresh = false;
}


async function boardRefresh() {
    await downloadFromServer('backlog');
    let tmp_backlog = backlog;
    while (backlog_on_refresh) {
        await timeout(timeout_length);
        await downloadFromServer('backlog');
        if (tmp_backlog[tmp_backlog.length - 1].time != backlog[backlog.length - 1].time) {
            tmp_backlog = undefined;
            tmp_backlog = backlog;
            updateHTML();
            console.log('backlog changed');
        }else{
            console.log('nothing changed');
        }
        
    }
}