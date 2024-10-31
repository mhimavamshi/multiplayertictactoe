function handle_join(data) {
    symbolspan.innerHTML = data.symbol;
    player_symbol = data.symbol;
    if(data.full) {
        gamestatus.innerHTML = `<b>${opposite[data.symbol]} joined<b>`;
    }
}

function handle_broadcast(data) {
    messages.innerHTML += `<i><b>${data.symbol}<b>: ${data.message}</i><br>`;
}

function handle_newplayer(data) {
    gamestatus.innerHTML = `<b>${data.symbol} joined<b>`;
    info_store["client_data"] = data;
}

function handle_rejoin(data) {
    symbolspan.innerHTML = data.symbol;
    player_symbol = data.symbol;
    if(data.full) {
        gamestatus.innerHTML = `<b>${opposite[data.symbol]} joined<b>`;
    }
    make_board(data.state); 
    show_status(data.last, data.status);
}

function handle_moved(data) {
    var [x, y] = data.move.split(" ");
    game_buttons[x][y].value = data.symbol;
    show_status(data.symbol, data.status);
}

let handler_lookup = {
    "joined": handle_join,
    "rejoined": handle_rejoin,
    "broadcasted": handle_broadcast,
    "newplayer": handle_newplayer,
    "moved": handle_moved
}


function handle_message(data) {
    data = JSON.parse(data);
    console.log(data);
    handler_lookup[data.event](data.data);
}