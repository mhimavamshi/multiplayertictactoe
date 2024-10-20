let event_set = new Set(["join", "move", "broadcast"]);
let event_data_requirements = {"join": ["clientID", "gameID"], 
    "move": ["clientID", "gameID", "position"], 
    "broadcast": ["clientID", "gameID", "message"]
}


export { event_set, event_data_requirements };