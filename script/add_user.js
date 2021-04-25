let user_template = {
    id: '',
    name: '',
    mail: '',
    category: '',
    img: ''
}
refreshUserTable();

async function addUser() {
    let user = {};
    await fillUserTemplate();
    user = user_template;
    log_template.sort = 'new_user';
    log_template.name = user;
    addBacklog(log_template);
    await addUserToServer(user);
    location.reload(); 
}

function generateUserId() {
    for (let i = 0; i <= users.length; i++) {
        let index = users.findIndex(x => x.id == i);
        if (index == -1) {
            user_template.id = i;
        }
    }
}


async function fillUserTemplate() {
    generateUserId();
    user_template.name = document.getElementById('user-name').value;
    user_template.mail = document.getElementById('user-email').value;
    user_template.category = document.getElementById('user-category').value;;
    const canvas = document.querySelector('canvas');
    let dataURL = canvas.toDataURL();
    user_template.img = dataURL;
}

async function refreshUserTable() {
    await downloadFromServer('users');
    document.getElementById('user-table').innerHTML = userTable();
}