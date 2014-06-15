// Load modules
var UserCtrl = require('./../controller/user');
var AuthCtrl = require('./../controller/auth');
var StacksCtrl = require('./../controller/stack');
var LanguagesCtrl = require('./../controller/language');
var CategoryCtrl = require('./../controller/category');
var ToolCtrl = require('./../controller/tool');
var GitHubCtrl = require('./../controller/github');
var BowerCtrl = require('./../controller/bower');

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
    }, {
        method: 'POST',
        path: '/auth/ghLogin',
        config: AuthCtrl.ghLogin
    },
    {
        method: 'GET',
        path: '/users',
        config: AuthCtrl.getProfile
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
    },{
		method: 'PUT',
		path: '/category/edit/{id}',
		config: CategoryCtrl.editCategory
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
	},

	// GitHub routes
	{
		method: 'GET',
		path: '/github/repo/{user}/{repo}',
		config: GitHubCtrl.getGithubInfo
	},
	{
		method: 'GET',
		path: '/github/readme/{user}/{repo}',
		config: GitHubCtrl.getReadme
	},
	{
		method: 'GET',
		path: '/github/tags/{user}/{repo}',
		config: GitHubCtrl.getGithubTags
	},
	{
		method: 'POST',
		path: '/github/file',
		config: GitHubCtrl.getFileInfo
	},

	// Bower routes
	{
		method: 'GET',
		path: '/bower/{package}',
		config: BowerCtrl.getBowerInfo
	}

];