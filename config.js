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
        "production": {
            host: 'dbh56.mongolab.com',
            port: 27567,
            db: 'showmystack',
            username: 'showmystack',
            password: 'uridotan'
        },
        "$default": {
            host: '127.0.0.1',
            port: 27017,
            db: 'showmystack_dev',
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

console.log("ENV:" + process.env.NODE_ENV);