/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Stack = require('./stack');
var AuthHelper = require('./../../helper/auth');
var JoiHelper = require('../../helper/joi');
var UserSchema = require('./user').Schema;
var UserValidation = require('./user').Validation;

var StackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'ShowMyStackUser',
		required: true,
		index: true
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: 'ShowMyStackUser',
		required: true,
		index: true
	},
    languages: [{
		_id: false,
        lang: {
            type: Schema.Types.ObjectId,
            ref: 'Language',
            required: true,
            index: true
        },
        tools: [{
			_id: false,
            tool: {
                type: Schema.Types.ObjectId,
                ref: 'Tool',
                index: true
            },
            version: {
                type: Schema.Types.ObjectId,
                index: true
            }
        }]
    }],
    website: String,
	githubUrl: String
});

StackSchema.plugin(timestamps);
StackSchema.statics.removeInternalFieldsSelect = '';

StackSchema.statics.ValidationSchema = {
    title: Joi.string().required(),
    languages: Joi.any(),
    website: Joi.any().optional().allow(''),
	githubUrl: Joi.any().optional().allow('')
};

// Format the entity for the api, remove restricted fields
if (!StackSchema.options.toObject) StackSchema.options.toObject = {};
StackSchema.options.toObject.transform = function(doc, ret, options) {
    //  delete ret.users;
};

module.exports = Mongoose.model('Stack', StackSchema);
