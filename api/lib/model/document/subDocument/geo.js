/**
 * Created by asafdav on 3/10/14.
 */
var Mongoose = require('mongoose');
var Joi = require('joi');
var Hapi = require('hapi');

var GeoSchema = {
  type: {type: String},
  coordinates: []
};

var ValidationSchema = {
  type: Joi.string().required(),
  coordinates: Joi.any()
};

module.exports.Schema = GeoSchema;
module.exports.Validation = ValidationSchema;