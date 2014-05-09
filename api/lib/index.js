// Load modules
var Config = require('./../../config');
var Db = require('./config/db');
var Routes = require('./config/routes');
var PassportWrap = require('./config/passport');

// Declare internals
var internals = {};

exports.register = function (plugin, options, next) {
  plugin.dependency('travelogue');
  plugin.dependency('yar');
  PassportWrap.register(plugin);

  // Configure the cache
  var cache = plugin.cache({ expiresIn: Config.cache.ttl });

  // Bind plugin data
  plugin.bind({
    passport: PassportWrap.getPassport(),
    db: Db,
    cache: cache,
    config: Config
  });

  // Configure routes
  plugin.route(Routes.endpoints);
  next();
};
