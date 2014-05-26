/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');

var JoiHelper = require('../helper/joi');
var ToolCollection = require('../model/collection/tool');
var Tool = require('../model/document/tool');
var AuthHelper = require('../helper/auth');
var User = require('./../model/document/user');
var Category = require('./../model/document/category');
var CategoryCollection = require('./../model/collection/category');
var _ = require('lodash');

/**
 * Creates a new tool
 * @type {{tags: string[], description: string, validate: {payload: *}, auth: string, handler: handler}}
 */
exports.create = {
    tags: ['api', 'tool'],
    description: 'Creates a tool',
    validate: {
        payload: Tool.ValidationSchema
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
        var tool = ToolCollection.create(request.payload);

		tool.save(function(err, newTool) {
            if (err) return reply({
                status: 'error',
                message: err
            }).code(500);

            reply(newTool.toObject());
        });
    }
};


exports.getAll = {
    tags: ['api', 'tool'],
    description: 'Returns a list of all tools.',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }],
    handler: function(request, reply) {
        ToolCollection.getAll(
            function(err, tools) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(tools);
            }
        );
    }
};

exports.getByLanguageAndCategory = {
    tags: ['api', 'tool'],
    description: 'Returns a list of tools that related to a category and a language',
    notes: 'Valid response: <br/>' + '<pre><code>' + '</code></pre>',
	validate: {
		path: {
			langId: Joi.string().regex(JoiHelper.MongoIDRegex).required(), // Valid Mongodb's ObjectID
			catId: Joi.string().regex(JoiHelper.MongoIDRegex).required(), // Valid Mongodb's ObjectID
		}
	},
    auth: 'passport-bearer',
    pre: [{
        method: AuthHelper.rolePrerequsites(User.RoleTypes.ADMIN),
        assign: 'role'
    }],
    handler: function(request, reply) {
        ToolCollection.getByLanguageAndCategory(request.params.langId, request.params.catId,
            function(err, tools) {
                if (err) return reply({
                    status: 'error',
                    message: err
                }).code(500);

                reply(tools);
            }
        );
    }
};
