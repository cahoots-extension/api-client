/*
 * cahoots-api-client
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var shmock = require('shmock');

var resources = {
    tokens: require('./tokens'),
    organizations: require('./organizations'),
    persons: require('./persons')
};

var PORT = 9000;
var VERSION = 'v1';

var mock;

module.exports.boot = function boot () {
    var resource;

    mock = shmock(PORT);

    for (resource in resources) {
        resource = resources[resource](mock, VERSION);
    }
};

module.exports.shutdown = function shutdown (callback) {
    mock.close(callback);
};

process.env.ENDPOINT = 'http://localhost:' + PORT + '/' + VERSION;
