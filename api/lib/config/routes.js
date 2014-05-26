// Load modules
var UserCtrl = require('./../controller/user');
var AuthCtrl = require('./../controller/auth');
var StacksCtrl = require('./../controller/stack');
var LanguagesCtrl = require('./../controller/language');
var CategoryCtrl = require('./../controller/category');
var ToolCtrl = require('./../controller/tool');

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
        method: 'GET',
        path: '/stacks/getStack/{id}',
        config: StacksCtrl.getStack
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

    // Tools routes
    {
        method: 'POST',
        path: '/tool/add',
        config: ToolCtrl.create
    }, {
        method: 'GET',
        path: '/tool/all',
        config: ToolCtrl.getAll
    }, {
		method: 'GET',
		path: '/tool/language/{langId}/category/{catId}',
		config: ToolCtrl.getByLanguageAndCategory
	}

];