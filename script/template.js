function userTable() {
    let user_list = '';
    for (let i = 0; i < users.length; i++) {
        user_list += `<tr>
            <td class="mdl-data-table__cell--non-numeric">${users[i].name}</td>
            <td>${users[i].category}</td>
            <td>${users[i].mail}</td>
            <td> <img class="user-list-img" src="${users[i].img}" alt=""> </td>
        </tr>`;

    }
    return `<table class="mdl-data-table mdl-js-data-table mdl-table--selectable mdl-shadow--2dp">
    <tr>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th>Category</th>
        <th>email</th>
    </tr>
    ${user_list}
</table>`;
}

function generateToDoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo-card ${cardColor(element)}">
        
    <div id="todo-title"><b>${element['title']}</b></div>
    <div id="element-category">${element['category']}</div>
    <div id="element-urgency">${element['urgency']}</div>
    <div id="element-date">${element['date']}</div>
    ${generateToDoHTMLAccordingToList(element['assigned_to'])}
    <div class="description-container">
        <div class="description-title">
           <div>Description</div>
           <div id="open-img-${element['id']}"><img onclick="showDescription(${element['id']})" src="./img/arrow-1.png"></div>
           <div id="close-img-${element['id']}" class="d-none"><img onclick="closeDescription(${element['id']})" src="./img/arrow-2.png"></div>
        </div>
    <div id="element-description-${element['id']}" class="d-none">${element['description']}</div>    
    </div>
    <div class="delete-container">
    <div onclick="deleteSingleCard(${element['id']})" id="delete"><img src="./img/trash.png"></div>
    </div>`;
}

function cardColor(element) {
    switch (element.urgency) {
        case 'High':
            return 'todo-card-red';
        case 'Medium':
            return 'todo-card-yellow';
        case 'Low':
            return 'todo-card-green';
        default:
            return 'todo-card-grey';
    }
}

function generateToDoHTMLAccordingToList(list) {
    let list_template = '';
    if (list.length == 0) {
        list_template = 'no assigned Users'
    } else {
        for (let i = 0; i < list.length; i++) {
            let user = users.find(o => o.id == list[i]);
            list_template += `<div class="according-box-single">
            <img src=${user.img} alt="">
            <div>${user.name}</div>
        </div>`;
        }
    }
    return `<div class="according-box">
    <div style="">
        ${list_template}
    </div>
</div>`;
}

function updateAssignedToSelectionHTML(list) {
    let template = '';
    for (let i = 0; i < 5; i++) {

        if (list[i]) {
            let user = users.find(o => o.id == list[i]);
            template += `<div class="according-box-single-bright">
                <img src=${user.img} alt="">
                <div class="according-box-text">${user.name}</div>
            </div>`;
        } else {
            template += `<div class="according-box-single-bright">
                <img src="img/user.png" alt="">
                <div class="according-box-text">nicht zugewiesen</div>
            </div>`;
        }
    }
    document.getElementById('assigned_to_selection').innerHTML = template;
    document.getElementById('assigned_to').getElementsByTagName('option')[0].selected = 'selected';

}


function backlogTable() {
    let log_list = '';
    backlog.reverse();
    for (let i = 0; i < backlog.length; i++) {
        log_list += `<tr>
            <td class="mdl-data-table__cell--non-numeric">${backlogCategory(backlog[i])}</td>
            <td>${backlogDescription(backlog[i])}</td>
            <td>${backlog[i].time}</td>
        </tr>`;

    }
    backlog.reverse();
    return `<table class="mdl-data-table mdl-js-data-table mdl-table--selectable mdl-shadow--2dp">
    <tr>
        <th class="mdl-data-table__cell--non-numeric">Category</th>
        <th>Description</th>
        <th>Timestamp</th>
    </tr>
    ${log_list}
</table>`;

}

function backlogCategory(element) {
    switch (element.sort) {
        case 'new_card':
            return 'Card created';
        case 'move_card':
            return 'Card moved';
        case 'new_user':
            return 'User created';
        case 'delete_card':
            return 'Card removed';
        default:
            return 'x';
    }
}

function backlogDescription(element) {
    switch (element.sort) {
        case 'new_card':
            return `The Card "${element.cardname}" was created`;
        case 'move_card':
            return `The Card "${element.cardname}" was moved from "${element.start}" to "${element.end}"`;
        case 'new_user':
            return 'User created';
        case 'delete_card':
            return `The Card "${element.cardname}" was removed`;
        default:
            return 'x';
    }
}