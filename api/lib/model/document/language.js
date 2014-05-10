/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Language = require('./language');
var JoiHelper = require('../../helper/joi');

var LanguageSchema = new Schema({
    langName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    icon: {
        type: String
    }
});

LanguageSchema.plugin(timestamps);
LanguageSchema.statics.removeInternalFieldsSelect = "langName icon";

LanguageSchema.statics.ValidationSchema = {
    langName: Joi.string().required(),
    icon: Joi.string()
};

// Format the entity for the api, remove restricted fields
if (!LanguageSchema.options.toObject) LanguageSchema.options.toObject = {};
LanguageSchema.options.toObject.transform = function(doc, ret, options) {

};

module.exports = Mongoose.model('Language', LanguageSchema);
