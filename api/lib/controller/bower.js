/**
 * Created by dotansimha
 */

'use strict';

var Hapi = require('hapi');
var Joi = require('joi');

var AuthHelper = require('../helper/auth');
var BowerHelper = require('../helper/bower');
var User = require('./../model/document/user');
var ToolCollection = require('../model/collection/tool');
var Tool = require('../model/document/tool');
var _ = require('lodash');

/**
 * Gets information on bower package
 */
exports.getBowerInfo = {
	tags: ['api', 'bower'],
	description: 'Gets information on bower package',
	auth: 'passport-bearer',
	pre: [{
		method: AuthHelper.rolePrerequsites(User.RoleTypes.EDITOR),
		assign: 'role'
	}, {
		method: AuthHelper.checkRoles,
		assign: 'checkRoles'
	}],
	handler: function(request, reply) {
		BowerHelper.getBowerPackageInfo(request.params.package, function(info) {
			var toolObj = info;
			toolObj.url = toolObj.url.replace('git://', 'https://').replace('.git', '');

			ToolCollection.getToolByGhUrl(info.url, function(err, rslt)
			{
				toolObj.existsInTools = rslt.length > 0;


				reply(toolObj);
			});
		});
	}
};