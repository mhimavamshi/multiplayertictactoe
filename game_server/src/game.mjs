class Player {
 
    constructor(clientID, ws) {
        this.clientID = clientID;
        this.symbol = "";
        this.ws = ws;
    }

    send(data) {
        // console.log(`Sent ${data} to player ${this.clientID}`);
        this.ws.send(JSON.stringify(data));
    }

}


class Game {

    constructor() {
        this.moveNumber = 0;
        this.moveSymbol = "X";

    }

}


export { Game, Player };