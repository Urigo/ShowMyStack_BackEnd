/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Framework = require('./../document/framework');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of framework
 * @param framework
 * @returns {Framework}
 */
exports.create = function(framework) {
    return new Framework(framework);
};

/**
 * Find the wanted framework by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    Framework.findById(id)
        .select(Framework.removeInternalFieldsSelect)
        .exec(cb);
};

/**
 * Get all the frameworks by langauge id
 * @param langId
 * @param cb
 */
exports.getAllByLanguageId = function(langId, cb) {
    var query = {
        languageId: langId
    };

    Framework.find(query, Framework.removeInternalFieldsSelect).exec(cb);
};

/**
 * Get all the frameworks
 * @param cb
 */
exports.getAll = function(cb) {
    var query = {};

    Framework.find(query, Framework.removeInternalFieldsSelect).exec(cb);
};
