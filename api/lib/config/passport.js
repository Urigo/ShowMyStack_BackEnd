/**
 * Created by asafdav on 25/03/14.
 */

// External modules
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Local modules
var Auth = require('../helper/auth');
var Config = require('../../../config');

var internals = {};

exports.register = function(plugin) {
    // Get passport instance
    var Passport = internals.Passport = plugin.plugins.travelogue.passport;

    // Configure local strategy
    Passport.use(new LocalStrategy(Auth.passportLocalStrategy));
    Passport.serializeUser(function(user, done) {
        done(null, user);
    });
    Passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Configure bearer strategy
    Passport.use(new BearerStrategy({}, Auth.BearerStrategy));

    // Set the api auth strategy
    plugin.auth.scheme('passport-bearer', function(settings) {
        return {
            authenticate: function(request, reply) {
                Passport.authenticate('bearer', {
                    session: false
                }, Auth.bearerAuthenticator(reply))(request, reply);
            }
        };
    });
    plugin.auth.strategy('passport', 'passport');
    plugin.auth.strategy('passport-bearer', 'passport-bearer');
};

exports.getPassport = function() {
    return internals.Passport;
};