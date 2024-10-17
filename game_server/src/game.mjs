class Player {
 
    constructor(clientID, ws) {
        this.clientID = clientID;
        this.ws = ws;
        this.symbol = "";
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}


export { Player };