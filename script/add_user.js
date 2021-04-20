let user_template = {
    id: '',
    name: '',
    mail: '',
    category: ''
}


async function addUser() {
    let user = {};
    fillUserTemplate();
    user = user_template;
    await addUserToServer(user);
    refreshUserTable();
}

function generateUserId() {
    for (let i = 0; i <= users.length; i++) {
        let index = users.findIndex(x => x.id == i);
        if (index == -1) {
            user_template.id = i;
        }
    }
}


function fillUserTemplate() {
    generateUserId();
    user_template.name = document.getElementById('user-name').value;
    user_template.mail = document.getElementById('user-email').value;
    user_template.category = 'nicht hinzugefügt';
}

async function refreshUserTable() {
    await downloadFromServer('users');
    document.getElementById('user-table').innerHTML = userTable();
}