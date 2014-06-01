/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Tool = require('./../document/tool');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of tool
 * @param tool
 * @returns {Tool}
 */
exports.create = function(tool) {
    return new Tool(tool);
};

/**
 * Find the wanted tool by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    tool.findById(id)
        .select(Tool.removeInternalFieldsSelect)
        .exec(cb);
};

/**
 * Get all the tools
 * @param cb
 */
exports.getAll = function(cb) {
    var query = {};

    Tool.find(query, Tool.removeInternalFieldsSelect).exec(cb);
};

/**
 * Get all the tools by language id and category id
 * @param cb
 */
exports.getByLanguageAndCategory = function(langId, catId, cb) {
    var query = {language: langId, categories: catId};

    Tool.find(query, Tool.removeInternalFieldsSelect).exec(cb);
};

/**
 * Check if tools exits by gh url
 * @param ghUrl
 * @param cb
 */
exports.getToolByGhUrl = function(ghUrl, cb) {
	var query = {githubUrl: ghUrl};

	Tool.find(query, Tool.removeInternalFieldsSelect).exec(cb);
};
