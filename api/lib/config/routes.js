// Load modules
var UserCtrl = require('./../controller/user');
var AuthCtrl = require('./../controller/auth');

// API Server Endpoints
exports.endpoints = [
    // Auth routes
    {
        method: 'POST',
        path: '/auth/login',
        config: AuthCtrl.login
    }, {
        method: 'POST',
        path: '/auth/register',
        config: AuthCtrl.register
    }, {
        method: 'POST',
        path: '/auth/fbLogin',
        config: AuthCtrl.fbLogin
    }, {
        method: 'POST',
        path: '/auth/fbRegister',
        config: AuthCtrl.fbRegister
    },

    // User routes
    {
        method: 'GET',
        path: '/users',
        config: UserCtrl.profile
    }
];