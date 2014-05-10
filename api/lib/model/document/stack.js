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

var StackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    languages: [{
        lang: {
            type: Schema.Types.ObjectId,
            ref: 'Language',
            required: true,
            index: true
        },
        frameworks: [{
            framework: {
                type: Schema.Types.ObjectId,
                ref: 'Framework',
                index: true
            },
            frameworkVersion: {
                type: Schema.Types.ObjectId,
                index: true
            },
            extensions: [{
                extension: {
                    type: Schema.Types.ObjectId,
                    ref: 'Extension',
                    index: true
                },
                version: {
                    type: Schema.Types.ObjectId,
                    index: true
                }
            }]
        }]
    }],
    website: String
});

StackSchema.plugin(timestamps);
StackSchema.statics.removeInternalFieldsSelect = "";

StackSchema.statics.ValidationSchema = {
    title: Joi.string().required(),
    githubUrl: Joi.string().required(),
    languages: Joi.any(),
    website: Joi.string()
};

// Format the entity for the api, remove restricted fields
if (!StackSchema.options.toObject) StackSchema.options.toObject = {};
StackSchema.options.toObject.transform = function(doc, ret, options) {
    //  delete ret.users;
};

module.exports = Mongoose.model('Stack', StackSchema);
