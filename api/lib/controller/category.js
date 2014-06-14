/**
 * Created by dotansimha
 */
'use strict';

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

/**
 * Updates a category.
 **/
exports.editCategory = {
	tags: ['api', 'category'],
	description: 'Updates a category',
	notes: 'Valid response: <br/>' +
		'<pre><code>' + '</code></pre>',
	validate: {
		path: {
			id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Valid Mongodb's ObjectID
		},
		payload: Category.ValidationSchema
	},
	auth: 'passport-bearer',
	handler: function(request, reply) {
		CategoryCollection.update(request.params.id, request.payload, function(err, category) {
			if (err) return reply({
				status: 'error',
				message: err
			}).code(500);
			if (!category) return reply({
				status: 'error',
				message: 'Not found'
			}).code(404);

			reply(category).code(200); // Created or saved
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
