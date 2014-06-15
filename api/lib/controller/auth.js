/**
 * Created by asafdav on 2/26/14.
 */
'use strict';
var Hapi = require('hapi');
var Joi = require('joi');
var UserCollection = require('../model/collection/user');


// Declare internals
var internals = {};


exports.getProfile = {
	tags: ['api', 'auth'],
	description: 'Gets user info',
	notes: 'Valid response: <br/>' +
		'<pre><code>' + '</code></pre>',
	auth: 'passport-bearer',
	handler: function(request, reply) {
			reply(request.auth.credentials).code(200); // Created or saved
	}
};

/**
 * Updates a github access token.
 *
 * @type {{tags: string[], description: string, validate: {path: {id: *}, payload: *}, auth: string, pre: {method: Function, assign: string}[], handler: handler}}
 */
exports.ghLogin = {
	tags: ['api', 'github', 'auth'],
	description: 'Updates a github access token',
	notes: 'Valid response: <br/>' +
		'<pre><code>' + '</code></pre>',
	auth: 'passport-bearer',
	handler: function(request, reply) {
		UserCollection.updateGhToken(request.payload, request.auth.credentials, function(err, user) {
			if (err) return reply({
				status: 'error',
				message: err
			}).code(500);
			if (!user) return reply({
				status: 'error',
				message: 'Not found'
			}).code(404);

			reply(user).code(200); // Created or saved
		});
	}
};


/**
 * Login handler
 * @type {{tags: string[], description: string, notes: string, validate: {payload: {username: (*|SchemaType), password: (*|SchemaType)}}, auth: boolean, handler: handler}}
 */
exports.login = {
    tags: ['api', 'authentication'],
    description: 'Tries to login as a user <br/>' +
        'Returns the user\'s access token, if the user has no access, a new one will be created.',
    notes: 'Response for a bad request: <br/>' +
        '<pre><code>' + JSON.stringify({
            "status": "error",
            "message": "Wrong credentials"
        }, null, 4) + '</code></pre>' +
        '<br/><br/>' +
        'Valid response:' +
        '<pre><code>' +
        JSON.stringify({
            "user": {
                "__v": 1,
                "active": true,
                "createdAt": "2014-03-04T09:25:23.191Z",
                "email": "test",
                "role": "EDITOR",
                "updatedAt": "2014-03-04T09:26:09.156Z",
                "verified": false
            },
            "access_token": "JPWWx8CYx3FKcJ1cFIos9GfQAmiSKnSu"
        }, null, 4) +
        '</code></pre>',
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    auth: false,
    handler: function(request, reply) {
        this.passport.authenticate('local', function(err, user, info) {
            if (err) {
                return reply({
                    status: "error",
                    message: err
                });
            }
            if (!user) {
                return reply({
                    status: "error",
                    message: "Wrong credentials"
                }).code(401);
            }

            // Generate the token if needed and return it
            if (user.access_tokens.length === 0) {
                user.generateToken(null, function(err, token) {
                    user.save(function(err, response) {
                        if (err) return reply({
                            status: 'error',
                            message: err
                        }).code(500);
                        reply({
                            user: user.toObject(),
                            access_token: token.token
                        });
                    });
                });
            } else {
                reply({
                    user: user.toObject(),
                    access_token: user.access_tokens[0].token
                });
            }

        })(request, reply);
    }
};

/**
 * Creates a new capsuling user
 *
 * @type {{validate: {payload: {username: (*|SchemaType), password: (*|SchemaType)}}, auth: boolean, handler: handler}}
 */
exports.register = {
    // Lout configuration
    tags: ['api', 'authentication'],
    description: 'Creates a new user',
    notes: 'Valid response: <br/>' +
        '<pre><code>' +
        JSON.stringify({
            "__v": 0,
            "createdAt": "2014-03-25T23:15:49.001Z",
            "updatedAt": "2014-03-25T23:15:49.001Z",
            "email": "test",
            "role": "EDITOR",
            "active": true,
            "verified": false
        }, null, 4) +
        '</code></pre>',
    // Validation
    validate: {
        payload: {
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    auth: false,

    // Handle the request
    handler: function(request, reply) {
        var user = UserCollection.create(request.payload);
        user.save(function(err, user) {
            if (err) {
				if (err.code === 11000)
				{
					return reply({
						status: 'error',
						message: 'This e-mail already exists in ShowMyStack!'
					}).code(500);
				}

				return reply({
					status: 'error',
					message: err
				}).code(500);
			}

            reply(user.toObject());
        });
    }
};

/**
 * Implements FB register
 * @type {{tags: string[], description: string, notes: string, validate: {payload: {accessToken: *}}, auth: boolean, handler: handler}}
 */
exports.fbRegister = {
    tags: ['api', 'authentication'],
    description: 'Creates a new user using facebook connect and returns the created user.' +
        'in case a user with the same email address or facebook id is already exists, the method won\'t create a new user and will return the existing object.',
    notes: 'Valid response: <br/>' +
        '<pre><code>' +
        JSON.stringify({
            "_id": "5351a21cbf4dd7aee3b28aad",
            "email": null,
            "name": "Open Graph Test User",
            "role": "EDITOR",
            "active": true,
            "verified": false,
            "facebook": {
                "id": "100007773222474"
            }
        }, null, 4) +
        '</code></pre>',
    validate: {
        payload: {
            facebookId: Joi.string().required(),
            accessToken: Joi.string().required()
        }
    },
    auth: false,
    handler: function(request, reply) {
        var FB = require('fb');
        FB.setAccessToken(request.payload.accessToken);

        FB.api('/me', {
            fields: ['id', 'email', 'name', 'birthday', 'gender']
        }, function(res) {
            if (!res || res.error) {
                return reply(Hapi.error.badRequest(res.error.message));
            }

            var user = {
                email: res.email ? res.email : null,
                name: res.name,
                facebook: {
                    id: res.id,
                    accessToken: request.payload.accessToken
                }
            };

            UserCollection.createByFacebook(user, function(err, user) {
                if (err) return reply(Hapi.error.badRequest(err));

                reply(user.toObject()).code(201);
            });
        });
    }
};

exports.fbLogin = {
    tags: ['api', 'authentication'],
    description: 'Login using facebook connect.',
    notes: 'Response for a bad request: <br/>' +
        '<pre><code>' + JSON.stringify({
            "status": "error",
            "message": "Unknown user"
        }, null, 4) + '</code></pre>' +
        '<br/><br/>' +
        'Valid response: <br/>' +
        '<pre><code>' +
        JSON.stringify({
            "user": {
                "__v": 1,
                "createdAt": "2014-04-18T22:45:39.873Z",
                "updatedAt": "2014-04-18T22:45:39.873Z",
                "_id": "5351ab11bf4dd7aee3b28ab9",
                "email": null,
                "name": "Open Graph Test User",
                "role": "EDITOR",
                "active": true,
                "verified": false,
                "facebook": {
                    "id": "100007773222474"
                }
            },
            "access_token": "53zNKcb0UkJFAyD6cnkLCGhBPnC1Fsto"
        }, null, 4) +
        '</code></pre>',
    validate: {
        payload: {
            accessToken: Joi.string().required()
        }
    },
    auth: false,
    handler: function(request, reply) {
        var FB = require('fb');
        FB.setAccessToken(request.payload.accessToken);

        FB.api('/me', {}, function(res) {
            if (!res || res.error) {
                return reply(Hapi.error.badRequest(res.error.message));
            }

            UserCollection.findByFacebook(res.id, function(err, user) {
                if (err || !user) return reply({
                    status: "error",
                    message: "Unknown user"
                }).code(401);

                if (user.access_tokens.length === 0) {
                    user.generateToken(null, function(err, token) {
                        user.save(function(err, response) {
                            if (err) return reply({
                                status: 'error',
                                message: err
                            }).code(500);
                            reply({
                                user: user.toObject(),
                                access_token: token.token
                            });
                        });
                    });
                } else {
                    reply({
                        user: user.toObject(),
                        access_token: user.access_tokens[0].token
                    });
                }
            });
        });
    }
};