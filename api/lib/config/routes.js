// Load modules
var UserCtrl = require('./../controller/user');
var AuthCtrl = require('./../controller/auth');
var StacksCtrl = require('./../controller/stack');
var LanguagesCtrl = require('./../controller/language');
var FrameworksCtrl = require('./../controller/framework');
var CategoryCtrl = require('./../controller/category');
var ExtensionCtrl = require('./../controller/extension');

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
    },

    // Stacks routes
    {
        method: 'POST',
        path: '/stacks/add',
        config: StacksCtrl.create
    }, {
        method: 'GET',
        path: '/stacks/all',
        config: StacksCtrl.getAllStacks
    }, {
        method: 'GET',
        path: '/stacks/getById/{id}',
        config: StacksCtrl.getById
    }, {
        method: 'PUT',
        path: '/stacks/edit/{id}',
        config: StacksCtrl.editStack
    },

    // Langs routes
    {
        method: 'POST',
        path: '/language/add',
        config: LanguagesCtrl.create
    }, {
        method: 'GET',
        path: '/language/all',
        config: LanguagesCtrl.getAll
    },

    // Framworkes routes
    {
        method: 'POST',
        path: '/framework/add',
        config: FrameworksCtrl.create
    }, {
        method: 'GET',
        path: '/framework/all',
        config: FrameworksCtrl.getAll
    },

    // Categories routes
    {
        method: 'POST',
        path: '/category/add',
        config: CategoryCtrl.create
    }, {
        method: 'GET',
        path: '/category/all',
        config: CategoryCtrl.getAll
    },

    // Extensions routes
    {
        method: 'POST',
        path: '/extension/add',
        config: ExtensionCtrl.create
    }, {
        method: 'GET',
        path: '/extension/all',
        config: ExtensionCtrl.getAll
    }, {
        method: 'GET',
        path: '/extension/getByFramework/{id}/andLanguage/{lang}',
        config: ExtensionCtrl.getExtensionsByFrameworkAndLanguage
    }

];