#!/usr/bin/env node
require('dotenv').config()

const app = require('../app');
const debug = require('debug')('back:server');

let server = null;

if(process.env.ENV === 'dev'){
    const http = require('http');
    server = http.createServer(app);
} else {
    const https = require('https');
    const fs = require('fs');
    const options = {
        key: fs.readFileSync("cert/privkey.pem"),
        cert: fs.readFileSync("cert/cert.pem")
    }
    server = https.createServer(options, app);
}

//const port = normalizePort(process.env.PORT || '3200');
const port = normalizePort(process.env.PORT || '3500');
app.set('port', port);

server.listen(port, '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    console.log(addr)
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}