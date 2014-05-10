/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var ExtensionCollection = require('../model/collection/extension');
var Extension = require('../model/document/extension');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
var Category = require('./../model/document/category');
var CategoryCollection = require('./../model/collection/category');
var _ = require('lodash');

/**
 * Creates a new extension
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'extension'],
    description: 'Creates a extension',
    validate: {
        payload: Extension.ValidationSchema
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
        var ext = ExtensionCollection.create(request.payload);

        ext.save(function(err, newExt) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);
            reply(newExt.toObject());
        });
    }
};

exports.getExtensionsByFrameworkAndLanguage = {
    tags: ['api', 'extension', 'category'],
    description: 'Returns a list of all extensions by framework id inside categories',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {
        path: {
            id: Joi.string().regex(JoiHelper.MongoIDRegex).required(), // Valid Mongodb's ObjectID
            lang: Joi.string().regex(JoiHelper.MongoIDRegex).required() // Valid Mongodb's ObjectID
        }
    },
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
        assign: 'role'
    }],
    handler: function(request, reply) {
        CategoryCollection.getAllByLanguageId(request.params.lang, function(err, cats) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);

            ExtensionCollection.getAllByFrameworkId(request.params.id,
                function(err, exts) {
                    if (err) return reply({
                        status: 'error',
                        message: err
                    }).code(500);

                    reply({
                        categories: cats,
                        extensions: exts
                    });
                }
            );
        });


    }
};

exports.getAll = {
    tags: ['api', 'extension'],
    description: 'Returns a list of all extensions.',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {},
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }],
    handler: function(request, reply) {
        ExtensionCollection.getAll(
            function(err, exts) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(exts);
            }
        );
    }
};
