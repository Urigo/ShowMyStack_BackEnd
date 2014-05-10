/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Extension = require('./../document/extension');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of extension
 * @param extension
 * @returns {Extension}
 */
exports.create = function(extension) {
    return new Extension(extension);
};

/**
 * Find the wanted extension by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    Extension.findById(id)
        .select(Extension.removeInternalFieldsSelect)
        .exec(cb);
};

/**
 * Get all the extensions
 * @param cb
 */
exports.getAll = function(cb) {
    var query = {};

    Extension.find(query, Extension.removeInternalFieldsSelect).exec(cb);
};


/**
 * Get all the extensions by framework id
 * @param fwId
 * @param cb
 */
exports.getAllByFrameworkId = function(fwId, cb) {
    var query = {
        frameworks: fwId
    };

    Extension.find(query, Extension.removeInternalFieldsSelect).exec(cb);
};
