/**
 * Created by dotansimha\
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Stack = require('./stack');
var AuthHelper = require('./../../helper/auth');
var ThirdPartySchema = require('./subDocument/thirdParty').Schema;
var ThirdPartyValidation = require('./subDocument/thirdParty').Validation;
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
    languages: [String],
    thirdParties: [String],
    website: String
});

StackSchema.plugin(timestamps);
StackSchema.statics.removeInternalFieldsSelect = "";

StackSchema.statics.ValidationSchema = {
    title: Joi.string().required(),
    githubUrl: Joi.string().required(),
    thirdParties: Joi.array(),
    languages: Joi.array(),
    website: Joi.string()
};

// Format the entity for the api, remove restricted fields
if (!StackSchema.options.toObject) StackSchema.options.toObject = {};
StackSchema.options.toObject.transform = function(doc, ret, options) {
    //  delete ret.users;
};

module.exports = Mongoose.model('Stack', StackSchema);
