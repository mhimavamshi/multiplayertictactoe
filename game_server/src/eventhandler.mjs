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

    if(!(data.gameID in games)) {
        console.log(`Creating new game with game ID ${data.gameID}`);
        games[data.gameID] = new Set();
        console.log(games);
    }
    
    if(games[data.gameID].size < 2) {
        console.log(`Creating player with clientID ${data.clientID} for game ${data.gameID}`);
        var player = new Player(data.clientID, ws);
        player.symbol = games[data.gameID].size == 0 ? "X": "O";
        games[data.gameID].add(player);
        player.send({"event": "joined", "data": player.symbol});
        return;
    }

    ws.send(JSON.stringify({"event": "error", "data": "full room or invalid gameID or rejoin"}));
});





export { event_emitter, data_is_valid };