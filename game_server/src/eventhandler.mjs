import { EventEmitter } from "events";
import { EVENTS } from "./customevents.mjs";
import { Game, Player } from "./game.mjs";
import { event_set, event_data_requirements } from "./eventsinfo.mjs";

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

event_emitter.on(EVENTS.JOIN, (data, games, ws)=>{
    console.log(games);
    var player;

    if(!(data.gameID in games)) {
        console.log(`Creating new game with game ID ${data.gameID}`);
        games[data.gameID] = {"game": new Game(), "players": []};
        // game = new Game();
        // games[data.gameID].game = game;
        console.log(games);
    } else {
        console.log(`Room ${data.gameID} already exists`);
        player = games[data.gameID].players.find(player => player.clientID == data.clientID);
        if(player) {
            console.log(`Player ${player.clientID} already in the room ${data.gameID}`);
            player.ws = ws;
            player.send({"event": EVENTS.REJOINED, "data": {"symbol": player.symbol}});
            return;
        }
    }

    if(games[data.gameID].players.length < 2) {
        console.log(`Creating player with clientID ${data.clientID} for game ${data.gameID}`);
        player = new Player(data.clientID, ws);
        player.symbol = games[data.gameID].players.length == 0 ? "X": "O";
        games[data.gameID].players.push(player);
        player.send({"event": EVENTS.JOINED, "data": {"symbol": player.symbol}});
        return;
    }

    ws.send(JSON.stringify({"event": EVENTS.ERROR, "data": {"message": "full room or invalid gameID"}}));
});


event_emitter.on(EVENTS.MOVE, (data, games, ws)=>{

});


event_emitter.on(EVENTS.BROADCAST, (data, games, ws)=>{
    if(data.gameID in games) {
        var sender = games[data.gameID].players.find(player => player.clientID == data.clientID);
        // console.log(`Sender is ${sender}`); 
        if(sender) {
            games[data.gameID].players.forEach(player => {
                player.send({"event": EVENTS.BROADCASTED, "data": {"symbol": sender.symbol, "message": data.message}});
            });   
        }
    }
});

export { event_emitter, data_is_valid };