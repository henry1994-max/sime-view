let card_template = {
    title : '',
    date : '',
    category : '',
    urgency : '',
    description : '',
    assigned_to : '',
}
let card = {};

function addCard(){
    fillCardTemplate();
    card = card_template;
    addCardToServer(card);
}

function sasssas(){
    fillCardTemplate();
    addCardToServer(card);
}

function fillCardTemplate(){
    card_template.title = document.getElementById('title').value;
    card_template.date = document.getElementById('date').value;
    card_template.category = document.getElementById('category').value;
    card_template.urgency = document.getElementById('urgency').value;
    card_template.description = document.getElementById('description').value;
    card_template.assigned_to = document.getElementById('assigned_to').value;
}