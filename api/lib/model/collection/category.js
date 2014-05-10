/**
 * Created by dotansimha
 */

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
