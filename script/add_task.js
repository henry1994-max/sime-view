let card_template = {
    id: '',
    title : '',
    date : '',
    category : '',
    urgency : '',
    description : '',
    assigned_to : '',
    status: 'to_do'
}

function dialogVis(){
    document.getElementById('dialog-bg').classList = 'dialog-bg';
}


async function addCard(){
    let card = {};
    fillCardTemplate();
    card = card_template;
    await addCardToServer(card);
    updateHTML();
    document.getElementById('dialog-bg').classList = 'dialog-bg d-none';
    location.reload();
}

function generateCardId(){
    for (let i = 0; i <= cards.length; i++) {
        let index = cards.findIndex(x => x.id == i);
        if(index == -1 ){
            card_template.id = i;
        }
    }
}


function fillCardTemplate(){
    generateCardId();
    card_template.title = document.getElementById('title').value;
    card_template.date = document.getElementById('date').value;
    card_template.category = document.getElementById('category').value;
    card_template.urgency = document.getElementById('urgency').value;
    card_template.description = document.getElementById('description').value;
    card_template.assigned_to = document.getElementById('assigned_to').value;
}

function deleteSingleCard(id){
        let index = cards.findIndex(x => x.id == id);
        if(index != -1 ){
            console.log(index);
            backend.deleteItem(index, cards, 'cards');
        }
        updateHTML();

}