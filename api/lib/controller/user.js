var AuditEvent = require("./../model/document/auditEvent");

// Declare internals
var internals = {};

exports.profile = {
  tags: ['api', 'user'],
  description: 'Returns the authenticated user profile',
  auth: 'passport-bearer',
  handler: function(request, reply) {
    return reply({status: 'ok'});
  }
};