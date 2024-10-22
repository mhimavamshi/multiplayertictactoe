# Multiplayer Tic Tac Toe 


## Usage
- Install libraries, dependencies etc.,
```
$ pip install flask
$ cd game_server; npm install
```

- Start the HTTP Server
```
$ python http_server/server.py
```

- Start the WebSocket Server
```
$ node game_server/index.mjs
```

- Go to http://localhost:4000


#### TODO
- [X] Offline Mode
- [ ] Online Mode
    - [X] Game creation
    - [X] Player Validation (simple cookies for now)
    - [ ] Handle the same player for multiple games

#### log
- events are:
    - event: join, data: gameID, clientID   
        - can rejoin and get the symbol again

- game structure: 
    - games = {gameID: {Game: game, Players [ player, player]}}
    - each time games.players.find(player.id == req.id) for checking player membership for the game with gameID
    - no map or set for it as its just 2 players (X and O) 
    - 