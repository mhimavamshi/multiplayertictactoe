let turn = 0;

function winner(player) {
    if(game_over) return;
    game_status.innerHTML = player + " Won!";
    game_over = true;
}

function draw() {
    game_status.innerHTML = "Draw!";
    game_over = true;
}

function check_board(recent_move, player) {
    if(game_over) return;

    if(turn < 4) return;

    let [x, y] = recent_move.split('');

    x = parseInt(x);
    y = parseInt(y);

    for(let i = 0; i < 3; i++) {
        if(game_buttons[x][i].value != player) break;
        if(i == 2) winner(player);
    }

    for(let i = 0; i < 3; i++) {
        if(game_buttons[i][y].value != player) break;
        if (i == 2) winner(player);
    }

    if(x == y) {
        for(let i = 0; i < 3; i++) {
            if(game_buttons[i][i].value != player) break;
            if(i == 2) winner(player);
        }
    }

    if(x + y == 2) {
        for(let i = 0; i < 3; i++) {
            if(game_buttons[i][2-i].value != player) break;
            if(i == 2) winner(player); 
        }
    }

    if(!game_over && turn >= 9){ draw();  return; }

}


function place(event) {
    if(event.target.value != "-" || game_over) {
        return;
    }
    ++turn;
    const player = turn % 2 ? "X" : "O";
    game_status.innerHTML = "Waiting for "+opposite[player]+" 's move...";
    event.target.value = player;
    check_board(event.target.getAttribute("position"), player);
}


let game_area = document.querySelector(".GameArea");
let game_status = document.querySelector("#gamestatus");
let game_over = false;

let game_buttons = [];

let opposite = {'X': 'O', 'O': 'X'}

for(let i = 0; i < 3; ++i) {
    game_buttons.push([]);
    for(let j = 0; j < 3; ++j) {
        let button_node = document.createElement("input");
        button_node.setAttribute("type", "button");
        button_node.setAttribute("value", "-");
        button_node.setAttribute("position", `${i}${j}`);
        button_node.addEventListener("click", place);
        game_area.appendChild(button_node);
        game_buttons[i].push(button_node);
    }
    let br = document.createElement("br");
    game_area.appendChild(br);
}


let restart_button = document.querySelector("#restart");
restart_button.onclick = ()=>{
    location.reload();
};
