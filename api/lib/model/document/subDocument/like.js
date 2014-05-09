/**
 * Created by asafdav on 08/04/14.
 */
/**
 * Created by asafdav on 3/18/14.
 */
var Mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var Joi = require('joi');
var Hapi = require('hapi');


var LikeSchema = {
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
};


var ValidationSchema = {
  _user: Joi.string().required()
};

module.exports.Schema = LikeSchema;
module.exports.Validation = ValidationSchema;