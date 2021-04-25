let log_template = {
    time: '',
    sort: '',
    start: '',
    end: '',
    username: '',
    cardname: ''
}
let timeout_length = 2000;
let backlog_on_refresh = true;


function refreshLogTemplate() {
    log_template = undefined;
    log_template = {
        time: '',
        sort: '',
        start: '',
        end: '',
        username: '',
        cardname: ''
    }
}

async function addBacklog(log) {
    let tmp_log = {};
    let current = new Date();
    log.time = current;
    tmp_log = log;
    if (backlog.length > 19) {
        backlog.shift();
    }
    await addBacklogToServer(tmp_log);
    tmp_log = undefined;
    refreshLogTemplate();
}

async function updateBacklogHTML() {
    await downloadFromServer('backlog');
    document.getElementById('log_table').innerHTML = backlogTable();
}

function startBacklogRefresh(){
    backlog_on_refresh = true;
    backlogRefresh();
}

function endBacklogRefresh(){
    backlog_on_refresh = false;
}

async function backlogRefresh() {
    await downloadFromServer('backlog');
    while (backlog_on_refresh) {
        await timeout(timeout_length);
        let tmp_backlog = backlog;
        await downloadFromServer('backlog');
        if(tmp_backlog[0].time != backlog[0].time){
            console.log('backlog changed');
            document.getElementById('log_table').innerHTML = backlogTable();
        }
        tmp_backlog=undefined;
    }
}