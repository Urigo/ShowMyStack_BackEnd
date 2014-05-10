/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Framework = require('./framework');
var JoiHelper = require('../../helper/joi');
var Language = require('./language');

var FrameworkSchema = new Schema({
    frameworkName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    icon: String,
    githubUrl: String,
    versions: [{
        versionNumber: String,
        ghUrl: String
    }],
    languageId: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
        index: true
    }
});

FrameworkSchema.plugin(timestamps);
FrameworkSchema.statics.removeInternalFieldsSelect = "frameworkName icon githubUrl versions languageId";

FrameworkSchema.statics.ValidationSchema = {
    frameworkName: Joi.string().required(),
    icon: Joi.string(),
    githubUrl: Joi.string(),
    versions: Joi.array(),
    languageId: Joi.string()
};

// Format the entity for the api, remove restricted fields
if (!FrameworkSchema.options.toObject) FrameworkSchema.options.toObject = {};
FrameworkSchema.options.toObject.transform = function(doc, ret, options) {
    //  delete ret.users;
};

module.exports = Mongoose.model('Framework', FrameworkSchema);
