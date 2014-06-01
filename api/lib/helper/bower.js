'use strict';

var Hapi = require('hapi');
var request = require('request');


exports.getBowerPackageInfo = function(packageName, cb)
{
	request('https://bower.herokuapp.com/packages/' + packageName, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			cb(JSON.parse(body));
		}
	});
};