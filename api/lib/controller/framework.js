/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var FrameworkCollection = require('../model/collection/framework');
var Framework = require('../model/document/framework');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
var _ = require('lodash');

/**
 * Creates a new framework
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'framework'],
    description: 'Creates a framework',
    validate: {
        payload: Framework.ValidationSchema
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
        var lang = FrameworkCollection.create(request.payload);

        lang.save(function(err, newFramework) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);
            reply(newFramework.toObject());
        });
    }
};

exports.getAll = {
    tags: ['api', 'framework'],
    description: 'Returns a list of all frameworks.',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {},
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }],
    handler: function(request, reply) {
        FrameworkCollection.getAll(
            function(err, fws) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(fws);
            }
        );
    }
};
