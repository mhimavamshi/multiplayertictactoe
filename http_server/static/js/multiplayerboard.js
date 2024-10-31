let game_over = false;

let game_buttons = [];

const BLANK =  " ";

let game_area = document.querySelector(".GameArea");
let game_status = document.querySelector("#gamestatus");

function place(event) {
    if(event.target.value != BLANK || game_over) {
        return;
    }
    send_event("move", {
        "clientID": clientID,
        "gameID": gameID,
        "position": event.target.getAttribute("position")
    }, wsc);
    // player_symbol;
    // game_status.innerHTML = `Waiting for ${opposite[player_symbol]}'s move...`;
    // event.target.value = player_symbol;
    // check_board(event.target.getAttribute("position"), player);
}


for(let i = 0; i < 3; ++i) {
    game_buttons.push([]);
    for(let j = 0; j < 3; ++j) {
        let button_node = document.createElement("input");
        button_node.setAttribute("type", "button");
        button_node.setAttribute("value", BLANK);
        button_node.setAttribute("position", `${i} ${j}`);
        button_node.addEventListener("click", place);
        game_area.appendChild(button_node);
        game_buttons[i].push(button_node);
    }
    let br = document.createElement("br");
    game_area.appendChild(br);
}


function make_board(state) {
    let i = 0;
    for(let j = 0; j < 9; ++j) {
        console.log(`setting for ${i} ${j%3}`);
        game_buttons[i][j%3].value = state[j]; 
        if((j+1) % 3 == 0){ 
            ++i; 
        }     
    }
}

function show_status(symbol, status) {
    if(status == "won") {
        gamestatus.innerHTML = `<b>${symbol} won the game!<b>`;
    }
    if(status == "draw") {
        gamestatus.innerHTML = `<b>Game ended in a draw.<b>`;
    }
}

// let restart_button = document.querySelector("#restart");
// restart_button.onclick = ()=>{
//     location.reload();
// };


let home_button = document.querySelector("#home");
home_button.onclick = ()=>{
    location.href = "/";
};
