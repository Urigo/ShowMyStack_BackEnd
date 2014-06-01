var Hapi = require('hapi');
var GitHubApi = require('github');

var github = new GitHubApi({
	// required
	version: '3.0.0',
	// optional
	timeout: 5000
});

github.authenticate({
	type: 'oauth',
	key: '7db432f2c046f63c46d6',
	secret: '569acf9cf9ce0aa9acb904dc1cc3344c7a3cad91'
});

exports.getRepoInfo = function(repoUser, repoName, cb)
{
	github.repos.get({
		user: repoUser,
		repo: repoName
	}, function(err, res) {
		cb(err, res);
	});
};

exports.getTagList = function(repoUser, repoName, cb)
{
	github.repos.getTags({
		user: repoUser,
		repo: repoName
	}, function(err, res) {
		cb(err, res);
	});
};

exports.getReadme = function(repoUser, repoName, cb)
{
	github.repos.getReadme({
		user: repoUser,
		repo: repoName
	}, function(err, res) {
		cb(err, res);
	});
};