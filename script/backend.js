let cards = [];
let users = [];
let card_sorting = [];
let BASE_SERVER_URL = 'http://gruppe-66.developerakademie.com/script';


async function addUserToServer(user) {
    users.push(user);
    saveJSONToServer('users');
}

async function addCardToServer(card) {
    cards.push(card);
    saveJSONToServer('cards');
}

function addCardSortingToServer(sorting) {
    card_sorting.push(sorting);
    saveJSONToServer('card_sorting');
}

function deleteUser(id) {
    backend.deleteItem(id, users, 'users');
}


const backend = {
    setItem: function (key, item, database, databaseOnServer) {
        database[key] = item;
        return saveJSONToServer(databaseOnServer);
    },
    getItem: function (key, database) {
        if (!database[key]) {
            return null;
        }
        return database[key];
    },
    deleteItem: function (key, database, databaseOnServer) {
        database.splice(key, 1);
        return saveJSONToServer(databaseOnServer);
    }
};
window.onload = async function () {
    downloadFromServer('cards');
    downloadFromServer('card_sorting');
    downloadFromServer('users');
}

async function downloadFromServer(databaseOnServer) {
    let result = await loadJSONFromServer(databaseOnServer);
    switch (databaseOnServer) {
        case 'cards':
            cards = JSON.parse(result);
            break;
        case 'card_sorting':
            card_sorting = JSON.parse(result);
            break;
        case "users":
            users = JSON.parse(result);
            break;
        default:
            console.log('wrong file choosed in request!');
    }
    console.log('Loaded', databaseOnServer, result);
}

function setURL(url) {
    BASE_SERVER_URL = url;
}


/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */

async function loadJSONFromServer(database) {
    let response = await fetch(BASE_SERVER_URL + `/nocors.php?json=${database}&noache=` + (new Date().getTime()));
    return await response.text();

}


/**
 * Saves a JSON or JSON Array to the Server
 */
function saveJSONToServer(database) {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + `/save_json.php?json=${database}`;
        xhttp.open('POST', serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        switch (database) {
            case 'cards':
                xhttp.send(JSON.stringify(cards));
                break;
            case 'card_sorting':
                xhttp.send(JSON.stringify(card_sorting));
                break;
            case "users":
                xhttp.send(JSON.stringify(users));
                break;
            default:
                console.log('wrong file choosed in request!');
        }


    });
}


function determineProxySettings() {
    return '';

    if (window.location.href.indexOf('.developerakademie.com') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}