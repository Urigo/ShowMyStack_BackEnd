/**
 * Created by dotansimha
 */

'use strict';

var Hapi = require('hapi');
var Joi = require('joi');

var AuthHelper = require('../helper/auth');
var GitHubHelper = require('../helper/github');
var User = require('./../model/document/user');
var _ = require('lodash');

/**
 * Gets information on github repository
 */
exports.getGithubInfo = {
	tags: ['api', 'github'],
	description: 'Gets information on github repository',
	auth: 'passport-bearer',
	pre: [{
		method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
		assign: 'role'
	}, {
		method: AuthHelper.checkRoles,
		assign: 'checkRoles'
	}],
	handler: function(request, reply) {
		GitHubHelper.getRepoInfo(request.params.user, request.params.repo, function(err, info) {
			if (err)
			{
				return reply({
					status: 'error',
					message: err
				}).code(500);
			}

			reply(info);
		});
	}
};

/**
 * Gets tags on github repository
 */
exports.getGithubTags = {
	tags: ['api', 'github'],
	description: 'Gets tags on github repository',
	auth: 'passport-bearer',
	pre: [{
		method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
		assign: 'role'
	}, {
		method: AuthHelper.checkRoles,
		assign: 'checkRoles'
	}],
	handler: function(request, reply) {
		GitHubHelper.getTagList(request.params.user, request.params.repo, function(err, info) {
			if (err)
			{
				return reply({
					status: 'error',
					message: err
				}).code(500);
			}

			reply(info);
		});
	}
};

/**
 * Gets readme file on github repository
 */
exports.getReadme = {
	tags: ['api', 'github'],
	description: 'Gets readme on github repository',
	auth: 'passport-bearer',
	pre: [{
		method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
		assign: 'role'
	}, {
		method: AuthHelper.checkRoles,
		assign: 'checkRoles'
	}],
	handler: function(request, reply) {
		GitHubHelper.getReadme(request.params.user, request.params.repo, function(err, info) {
			if (err)
			{
				return reply({
					status: 'error',
					message: err
				}).code(500);
			}

			reply(info);
		});
	}
};

/**
 * Gets file from github repository
 */
exports.getFileInfo = {
	tags: ['api', 'github'],
	description: 'Gets file from github repository',
	auth: 'passport-bearer',
	pre: [{
		method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
		assign: 'role'
	}, {
		method: AuthHelper.checkRoles,
		assign: 'checkRoles'
	}],
	handler: function(request, reply) {
		GitHubHelper.getFileInfo(request.payload.user, request.payload.repo, request.payload.filename, function(err, info) {
			if (err)
			{
				return reply({
					status: 'error',
					message: err
				}).code(500);
			}

			reply(info);
		});
	}
};