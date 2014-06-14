/**
 * Created by dotansimha
 */
var Hapi = require('hapi');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');
var Category = require('./category');
var JoiHelper = require('../../helper/joi');
var Language = require('./language');

var CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
        index: true
    }],
	parentCategory:{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}
});

CategorySchema.plugin(timestamps);
CategorySchema.statics.removeInternalFieldsSelect = 'categoryName languages parentCategory';

CategorySchema.statics.ValidationSchema = {
    categoryName: Joi.string().required(),
    languages: Joi.array(),
	parentCategory: Joi.any().allow(null)
};

// Format the entity for the api, remove restricted fields
if (!CategorySchema.options.toObject) CategorySchema.options.toObject = {};
CategorySchema.options.toObject.transform = function(doc, ret, options) {

};

module.exports = Mongoose.model('Category', CategorySchema);
