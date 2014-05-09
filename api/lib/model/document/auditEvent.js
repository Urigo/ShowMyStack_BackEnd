/**
 * Created by asafdav on 2/26/14.
 */

// Require modules
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// Define the internal object
var internals = {};

var AuditEventTypes = ['registration'];
var AuditEventSchema = new Schema({
  type: {
    type: String,
    enum: AuditEventTypes,
    required: true
  },
  value1: {
    type: String
  },
  value2: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model("AuditEvent", AuditEventSchema);