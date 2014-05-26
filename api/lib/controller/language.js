/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var LanguageCollection = require('../model/collection/language');
var Language = require('../model/document/language');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
var _ = require('lodash');

/**
 * Creates a new language
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'language'],
    description: 'Creates a programming language',
    validate: {
        payload: Language.ValidationSchema
    },
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }, {
        method: AuthHelper.checkRoles,
        assign: 'checkRoles'
    }],
    handler: function(request, reply) {
        // Create a new language
        var lang = LanguageCollection.create(request.payload);

        // Save and return the created user
        lang.save(function(err, newLang) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);
            reply(newLang.toObject());
        });
    }
};

exports.getAll = {
    tags: ['api', 'language'],
    description: 'Returns a list of programing languages.',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {},
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
        assign: 'role'
    }],
    handler: function(request, reply) {
        LanguageCollection.getAll(
            function(err, langs) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(langs);
            }
        );
    }
};
