/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Stack = require('./../document/stack');
var Language = require('./../document/language');
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
 * Return all the stacks
 * @param id
 * @param cb
 */
exports.getAll = function(cb) {
    Stack.find({})
        .select(Stack.removeInternalFieldsSelect)
        .exec(cb);
};

/**
 * Updates the provided stack
 * @param id
 * @param stack
 * @param cb
 */
exports.update = function(id, stack, cb) {
    // Make sure to remove the current _id
    delete stack._id;

    Stack.update({
        _id: id
    }, stack, function(err, count, raw) {
        stack._id = id;
        cb(err, stack);
    });
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

/**
 * Find the wanted stack by id and populate the objects
 * @param id
 * @param cb
 */
exports.findByIdAndPopulate = function(id, cb) {
	Stack.findById(id)
		.select(Stack.removeInternalFieldsSelect)
		.populate('languages.lang')
		.populate('languages.tools.tool')
		.exec(cb);
};