/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Stack = require('./../document/stack');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of Stack
 * @param stack
 * @returns {Stack}
 */
exports.create = function(stack) {
    return new Stack(stack);
};

/**
 * Find the wanted stack by id
 * @param id
 * @param cb
 */
exports.findById = function(id, cb) {
    Stack.findById(id)
        .select(Stack.removeInternalFieldsSelect)
        .exec(cb);
};
