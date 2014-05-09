/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var StackCollection = require('../model/collection/stack');
var Stack = require('../model/document/stack');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
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
