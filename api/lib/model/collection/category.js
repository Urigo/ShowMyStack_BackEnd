/**
 * Created by dotansimha
 */
'use strict';

// Require
var Q = require('q');
var Category = require('./../document/category');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of category
 * @param cat
 * @returns {Category}
 */
exports.create = function(cat) {
    return new Category(cat);
};

/**
 * Update category
 * @param id
 * @param cat
 * @param cb
 * @returns {Category}
 */
exports.update = function(id, cat, cb) {
	// Make sure to remove the current _id
	delete cat._id;

	Category.update({
		_id: id
	}, cat, function(err, count, raw) {
		cat._id = id;
		cb(err, cat);
	});
};

/**
 * Find the wanted category by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    Category.findById(id)
        .select(Category.removeInternalFieldsSelect)
        .exec(cb);
};


/**
 * Get all the categories that related to language
 * @param langId
 * @param cb
 */
exports.getAllByLanguageId = function(langId, cb) {
    var query = {
        languages: langId
    };

    Category.find(query, Category.removeInternalFieldsSelect).exec(cb);
};

/**
 * Get all the categories
 * @param cb
 */
exports.getAll = function(cb) {
    var query = {};

    Category.find(query, Category.removeInternalFieldsSelect).exec(cb);
};
