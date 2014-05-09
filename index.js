// Load modules
var Hapi = require('hapi');
var Config = require('./config');

// Initialize the server
var server = Hapi.createServer(Config.server.api.host, process.env.PORT || Config.server.api.port, {
    cors: {
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
    }
});

// Require plugins
server.pack.require(Config.hapi.plugins, function(err) {
    if (err) {
        console.err('Failed loading plugins');
    }

    // Load the api plugin
    server.pack.require('./api', function(err) {
        if (err) {
            console.err('Failed loading the api');
        }
    });
});

// Expose the server
module.exports = server;