/**
 * Created by asafdav on 2/26/14.
 */
var Config = require('./../../../config');
var Mongoose = require('mongoose');

// Declare internals
var internals = {};

internals.connect = function() {
    var mongourl = 'mongodb://';
    if (Config.database.username) {
        mongourl += Config.database.username + ':' + Config.database.password + '@';
    }
    mongourl += Config.database.host + ':' + Config.database.port + '/' + Config.database.db;
    internals.db = Mongoose.connect(mongourl);
    return internals.db;
};

module.exports = internals.connect();