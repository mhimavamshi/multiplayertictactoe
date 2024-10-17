import { WebSocketServer } from 'ws';
import { event_emitter, data_is_valid } from './src/eventhandler.mjs';


const wss = new WebSocketServer({
  port: 8080,
});

let games = {};

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
        data = JSON.parse(data);
        console.log(data);
        if(data_is_valid(data)) {
          event_emitter.emit(data.event.toString(), data.data, games, ws);
        }
    });
  
    ws.send('server works!');
});