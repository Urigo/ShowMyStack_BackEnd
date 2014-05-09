/**
 * Created by asafdav on 3/10/14.
 */
var Mongoose = require('mongoose');
var Joi = require('joi');
var Hapi = require('hapi');

var ThirdPartySchema = {
    name: {
        type: String
    },
    version: {
        type: String
    },
    language: {
        type: String
    }
};

var ValidationSchema = {
    type: Joi.string().required(),
    version: Joi.string().required(),
    language: Joi.string().required(),
};

module.exports.Schema = ThirdPartySchema;
module.exports.Validation = ValidationSchema;
