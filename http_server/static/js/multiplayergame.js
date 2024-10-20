function handle_join(data) {
    symbolpara.innerHTML = `<b>${data}</b>`;
}



let handler_lookup = {
    "joined": handle_join,
    "rejoined": handle_join
}


function handle_message(data) {
    data = JSON.parse(data);
    console.log(data);
    handler_lookup[data.event](data.data);
}