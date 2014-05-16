/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var StackCollection = require('../model/collection/stack');
var Stack = require('../model/document/stack');
var LanguageCollection = require('../model/collection/language');
var Language = require('../model/document/language');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
var CategoryCollection = require('../model/collection/category');
var Category = require('../model/document/category');
var _ = require('lodash');

/**
 * Creates a new stack
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'stack'],
    description: 'Creates a new stack',
    validate: {
        payload: Stack.ValidationSchema
    },
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
        assign: 'role'
    }, {
        method: AuthHelper.checkRoles,
        assign: 'checkRoles'
    }],
    handler: function(request, reply) {
        // Create a new stack
        var stack = StackCollection.create(request.payload);

        // Save and return the created user
        stack.save(function(err, newStack) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);
            reply(newStack.toObject());
        });
    }
};


/**
 * Updates a stack.
 *
 * @type {{tags: string[], description: string, validate: {path: {id: *}, payload: *}, auth: string, pre: {method: Function, assign: string}[], handler: handler}}
 */
exports.editStack = {
    tags: ['api', 'stack'],
    description: 'Updates a stack',
    notes: 'Valid response: <br/>' +
        '<pre><code>' + '</code></pre>',
    validate: {
        path: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Valid Mongodb's ObjectID
        },
        payload: Stack.ValidationSchema
    },
    auth: 'passport-bearer',
    handler: function(request, reply) {
        StackCollection.update(request.params.id, request.payload, function(err, stack) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);
            if (!stack) return reply({
                status: 'error',
                message: 'Not found'
            }).code(404);

            reply(stack).code(200); // Created or saved
        });
    }
};


exports.getById = {
    tags: ['api', 'stack'],
    description: 'Returns a stack by id',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {
        path: {
            id: Joi.string().regex(JoiHelper.MongoIDRegex).required(), // Valid Mongodb's ObjectID
        }
    },
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
        assign: 'role'
    }],
    handler: function(request, reply) {
        StackCollection.findById(request.params.id, function(err, stack) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);

            reply(stack);
        });
    }
};

exports.getAllStacks = {
    tags: ['api', 'stack'],
    description: 'Returns a list of all stacks',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {

    },
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
        assign: 'role'
    }],
    handler: function(request, reply) {
        StackCollection.getAll(function(err, stacks) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);

            reply(stacks);
        });
    }
};