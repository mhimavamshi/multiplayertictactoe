function handle_join(data) {
    symbolpara.innerHTML = `<b>${data.symbol}</b>`;
}

function handle_broadcast(data) {
    messages.innerHTML += `<i><b>${data.symbol}<b>: ${data.message}</i><br>`;
}

let handler_lookup = {
    "joined": handle_join,
    "rejoined": handle_join,
    "broadcasted": handle_broadcast
}


function handle_message(data) {
    data = JSON.parse(data);
    console.log(data);
    handler_lookup[data.event](data.data);
}