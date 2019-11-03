const config = require(__dirname + '/config');
const print = require(__dirname + '/modules/print');
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function (request, response) {
    let clientIp = request.connection.remoteAddress === '::1' ? '127.0.0.1' : request.connection.remoteAddress;
    print.info(`recived request for ${request.url} from ${clientIp}`);
    response.writeHead(404);
    response.end();
});

server.listen(config.port, function () {
    print.info(`server running on localhost:${config.port}`);
});

const wss = new WebSocketServer({ httpServer: server });

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

const event = require(__dirname + '/modules/event');
wss.on('request', function (request) {

    if (!originIsAllowed(request.origin)) {
        // make sure we only accept requests from an allowed origin
        request.reject();
        print.warning(`connection from origin ${request.origin} rejected`);
        return;
    }

    let connection = request.accept(request.origin);
    print.info(`connection with ${connection.remoteAddress} opend`);

    connection.on('message', function (message) {
        // handle message
        if (!event.handle(message)) {
            print.error(`something went wrong while handling message`)
        }
    });

    connection.on('close', function (reasonCode, description) {
        print.info(`connection with ${connection.remoteAddress} closed`)
    });
});