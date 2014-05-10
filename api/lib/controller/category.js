/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var CategoryCollection = require('../model/collection/category');
var Category = require('../model/document/category');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var UserCollection = require('./../model/collection/user');
var _ = require('lodash');

/**
 * Creates a new category
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'category'],
    description: 'Creates a category',
    validate: {
        payload: Category.ValidationSchema
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
        var cat = CategoryCollection.create(request.payload);

        cat.save(function(err, newCat) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);

            reply(newCat.toObject());
        });
    }
};

exports.getAll = {
    tags: ['api', 'category'],
    description: 'Returns a list of all categories.',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    validate: {},
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }],
    handler: function(request, reply) {
        CategoryCollection.getAll(
            function(err, cats) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(cats);
            }
        );
    }
};
