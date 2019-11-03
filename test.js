const config = require(__dirname + '/config');
const print = require(__dirname + '/modules/print');
const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {

    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function () {
        console.log('Connection Closed');
    });

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    if (connection.connected) {
        connection.sendUTF(JSON.stringify({event: 'TEST_CLIENT'}));
    }

});

client.connect(`ws://localhost:${config.port}/`);