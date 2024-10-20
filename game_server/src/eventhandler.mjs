import { EventEmitter } from "events";
import { Player } from "./game.mjs";

let event_set = new Set(["join"]);
let event_data_requirements = {"join": ["clientID", "gameID"]}

function data_is_valid(data) {
    // console.log(`Data ${JSON.stringify(data)} check`);
    
    if(!(data.hasOwnProperty("event") && data.hasOwnProperty("data"))) return false;
    // console.log(`Data ${JSON.stringify(data)} fields are valid!`);
    
    if(!event_set.has(data.event)) return false;
    // console.log(`Event ${data.event} is valid!`);
    
    for(let key of event_data_requirements[data.event]) {
        if(!data.data.hasOwnProperty(key)) return false;
    }
    
    // console.log(`Data ${JSON.stringify(data)} is valid!`);
    return true;
}

const event_emitter = new EventEmitter();

event_emitter.on("join", (data, games, ws)=>{
    console.log(games);
    var player;

    if(!(data.gameID in games)) {
        console.log(`Creating new game with game ID ${data.gameID}`);
        games[data.gameID] = [];
        console.log(games);
    } else {
        console.log(`Room ${data.gameID} already exists`);
        player = games[data.gameID].find(player => player.clientID == data.clientID);
        if(player) {
            console.log(`Player ${player.clientID} already in the room ${data.gameID}`);
            ws.send(JSON.stringify({"event": "rejoined", "data": player.symbol}));
            return;
        }
    }

    if(games[data.gameID].length < 2) {
        console.log(`Creating player with clientID ${data.clientID} for game ${data.gameID}`);
        player = new Player(data.clientID);
        player.symbol = games[data.gameID].length == 0 ? "X": "O";
        games[data.gameID].push(player);
        ws.send(JSON.stringify({"event": "joined", "data": player.symbol}));
        return;
    }

    ws.send(JSON.stringify({"event": "error", "data": "full room or invalid gameID"}));
});


event_emitter.on("move", (data, games, ws)=>{

});


export { event_emitter, data_is_valid };