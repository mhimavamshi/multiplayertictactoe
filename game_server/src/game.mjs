class Player {
 
    constructor(clientID, ws) {
        this.clientID = clientID;
        this.symbol = "";
        this.ws = ws;
        this.moves = 0; 
    }

    send(data) {
        // console.log(`Sent ${data} to player ${this.clientID}`);
        this.ws.send(JSON.stringify(data));
    }

}


class Game {

    constructor() {
        this.move_number = 0;
        this.move_symbol = "X";
        this.last = this.move_symbol;
        this.BLANK = " ";
        this.board = [];
        this.game_over = false;
        this.status = "ongoing";
        this.opposite = {"X": "O", "O": "X"};
        for(let i = 0; i < 3; i++) {
            this.board.push([]);
            for(let j = 0; j < 3; j++) {
                this.board[i].push(this.BLANK);
            }
        }
    }

    check_move(move_info) {
        if(this.game_over || this.status != "ongoing") return false;
        // if((this.move_number & 1) && move_info.symbol == "X" || (this.move_number % 2 == 0) && move_info.symbol == "O") 
            // return false;
        if((this.move_number & 1) && move_info.symbol == "X" || (this.move_number % 2 == 0) && move_info.symbol == "O") 
            return false;

        return true;
    }

    check_board(x, y) {
        if(this.game_over) this.status = "over";
        if(this.move_number < 4) return;
        for(let i = 0; i < 3; i++) {
            if(this.board[x][i] != this.move_symbol) break;
            if(i == 2) this.status = "won";
        }
    
        for(let i = 0; i < 3; i++) {
            if(this.board[i][y] != this.move_symbol) break;
            if (i == 2) this.status = "won";
        }
    
        if(x == y) {
            for(let i = 0; i < 3; i++) {
                if(this.board[i][i] != this.move_symbol) break;
                if(i == 2) this.status = "won";
            }
        }
    
        if(x + y == 2) {
            for(let i = 0; i < 3; i++) {
                if(this.board[i][2-i] != this.move_symbol) break;
                if(i == 2) this.status = "won"; 
            }
        }

        if(!this.game_over && this.move_number >= 8) this.status = "draw";

        if(this.status == "won" || this.status == "draw") this.game_over = true;
    }

    move(move_info) {
        this.board[move_info.x][move_info.y] = move_info.symbol;
        this.check_board(move_info.x, move_info.y);
        ++this.move_number;
        this.last = this.move_symbol;
        this.move_symbol = this.opposite[this.move_symbol];
    }

    get state() {
        let data = [];
        for(let i = 0; i < 3; ++i) {
            for(let j = 0; j < 3; ++j) {
                data.push(this.board[i][j]);
            }
        }
        return data.join("");
    }



}


export { Game, Player };