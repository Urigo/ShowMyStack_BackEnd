/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Tool = require('./tool');
var Language = require('./language');

var ToolSchema = new Schema({
    toolName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    githubUrl: String,
    versions: [{
        versionNumber: String,
        ghUrl: String
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
	language: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
        index: true
    }
});

ToolSchema.plugin(timestamps);
ToolSchema.statics.removeInternalFieldsSelect = "";

ToolSchema.statics.ValidationSchema = {
	toolName: Joi.string().required(),
    githubUrl: Joi.string(),
    versions: Joi.array(),
	categories: Joi.array(),
	language: Joi.any()
};

// Format the entity for the api, remove restricted fields
if (!ToolSchema.options.toObject) ToolSchema.options.toObject = {};
ToolSchema.options.toObject.transform = function(doc, ret, options) {

};

module.exports = Mongoose.model('Tool', ToolSchema);
