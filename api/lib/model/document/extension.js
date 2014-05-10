/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Extension = require('./extension');
var JoiHelper = require('../../helper/joi');
var Language = require('./language');

var ExtensionSchema = new Schema({
    extensionName: {
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
    frameworks: [{
        type: Schema.Types.ObjectId,
        ref: 'Framework',
        required: true,
        index: true
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    }]
});

ExtensionSchema.plugin(timestamps);
ExtensionSchema.statics.removeInternalFieldsSelect = "extensionName versions githubUrl categories";

ExtensionSchema.statics.ValidationSchema = {
    extensionName: Joi.string().required(),
    githubUrl: Joi.string(),
    versions: Joi.array(),
    frameworks: Joi.array(),
    categories: Joi.array()
};

// Format the entity for the api, remove restricted fields
if (!ExtensionSchema.options.toObject) ExtensionSchema.options.toObject = {};
ExtensionSchema.options.toObject.transform = function(doc, ret, options) {
    //  delete ret.users;
};

module.exports = Mongoose.model('Extension', ExtensionSchema);
