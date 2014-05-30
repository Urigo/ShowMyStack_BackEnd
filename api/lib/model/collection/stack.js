/**
 * Created by dotansimha
 */

// Require
var Q = require('q');
var Stack = require('./../document/stack');
var Language = require('./../document/language');
var User = require('./../document/user');
var AuthHelper = require('../../helper/auth');

// Define the internal object
var internals = {};

/**
 * Creates a new instance of Stack
 * @param stack
 * @returns {Stack}
 */
exports.create = function(stack, user) {
	stack.createdBy = user._id;
	stack.updatedBy = user._id;

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
		.populate('createdBy', '-password -verified -active -role -access_tokens')
		.populate('updatedBy')
        .exec(cb);
};

/**
 * Updates the provided stack
 * @param id
 * @param stack
 * @param cb
 */
exports.update = function(id, stack, user, cb) {
    // Make sure to remove the current _id
    delete stack._id;
	stack.updatedBy = user._id;

    Stack.update({
        _id: id
    }, stack, function(err, count, raw) {
        stack._id = id;
        cb(err, stack);
    });
};