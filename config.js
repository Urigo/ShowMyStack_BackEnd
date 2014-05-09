var Path = require('path');
var Confidence = require('confidence');
var store = new Confidence.Store();

var config = {
    product: {
        name: 'ShowMyStack API'
    },
    server: {
        api: {
            "$filter": "env",
            "production": {
                host: '0.0.0.0',
                port: 80
            },
            "$default": {
                host: '0.0.0.0',
                port: 8001
            }
        },
        cache: {
            "$filter": "env",
            "test": {
                partition: 'capsuling_cache_test',
                engine: 'mongodb'
            },
            "$default": {
                partition: 'capsuling_cache',
                engine: 'mongodb'
            }
        }
    },
    cache: {
        ttl: 60 * 60 * 24 * 7
    },
    database: {
        "$filter": "env",
        "test": {
            host: '127.0.0.1',
            port: 27017,
            db: 'capsuling_test',
            username: '',
            password: ''
        },
        "staging": {
            host: 'ds031877.mongolab.com',
            port: 31877,
            db: 'heroku_app23362146',
            username: 'capsuling',
            password: 'capsuling'
        },
        "production": {
            host: '127.0.0.1',
            port: 27017,
            db: 'capsuling_prod',
            username: '',
            password: ''
        },
        "$default": {
            host: '127.0.0.1',
            port: 27017,
            db: 'capsuling_dev',
            username: '',
            password: ''
        }
    },
    "hapi": {
        "plugins": {
            "lout": {
                "endpoint": "/docs",
                "basePath": __dirname
            },
            "yar": {
                "cookieOptions": {
                    "password": "EveryDayImStacking",
                    "isSecure": false
                }
            },
            "travelogue": {
                "hostname": "0.0.0.0",
                "port": 8001,
                "urls": {
                    "failureRedirect": "/auth/login"
                },
                "excludePaths": ["/public/"]
            }
        }
    }
};

store.load(config);
module.exports = store.get('/', {
    env: process.env.NODE_ENV
});