/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Language = require('./../document/language');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of Language
 * @param lang
 * @returns {Language}
 */
exports.create = function(lang) {
    return new Language(lang);
};

/**
 * Find the wanted lang by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    Language.findById(id)
        .select(Language.removeInternalFieldsSelect)
        .exec(cb);
};

/**
 * Get all the langs
 * @param cb
 */
exports.getAll = function(cb) {
    var query = {};

    Language.find(query, Language.removeInternalFieldsSelect).exec(cb);
};
