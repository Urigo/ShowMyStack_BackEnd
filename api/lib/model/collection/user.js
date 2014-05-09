/**
 * Created by asafdav on 3/1/14.
 */
// Require modules
var User = require('./../document/user');

// Define the internal object
var internals = {};

/**
 * Creates a new User instance
 * @param user
 * @returns {User}
 */
exports.create = function(user) {
  return new User(user);
};

/**
 * Tries to login a user
 * @param candidate - {username: xx, password: y}
 * @param cb
 */
exports.login = function(candidate, cb) {
  User.findOne({email: candidate.email.toLowerCase()}, '+password', function(err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, null);
    user.comparePassword(candidate.password, function(err, isMatch) {
      if (err) return cb(err);

      if (isMatch) {
        return cb(null, user);
      } else {
        return cb(null, null);
      }
    });
  });
};

/**
 * Locate a user by access_token
 * @param token
 * @param cb
 */
exports.findUserByToken = function(token, cb) {
  User.findOne({'access_tokens.token': token}, function(err, user) {
    if (err) return cb(err);
    return cb(null, user);
  });
};

/**
 * Locates a user by facebook id
 * @param facebookId
 * @param cb
 */
exports.findByFacebook = function(facebookId, cb) {
  User.findOne({'facebook.id': facebookId}, function(err, user) {
    if (err) return cb(err);
    return cb(null, user);
  });
};

/**
 * Creates a new user using facebook
 * @param user
 * @param cb
 */
exports.createByFacebook = function(user, cb) {
  User.update({$or:
    [
      {'facebook.id': user.facebook.id},
      {email: user.email}
    ]},
    user,
    {upsert: true},
    function(err, count, raw) {
      if (err) return cb(err);

      // Returns the newly created user
      exports.findByFacebook(user.facebook.id, cb);
    }
  );
}