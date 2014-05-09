exports.requiredField = function(field, forceOptional) {
  return forceOptional ? field : field.required();
};

exports.MongoIDRegex = /^[0-9a-fA-F]{24}$/;
exports.IPRegex = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
