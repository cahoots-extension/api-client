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

var http = require('http');

module.exports = function instantiate (mock, version) {

    var persons = [
        {
            id: 'a70ac98f6379aca6e45a602ece8d9c28',
            name: 'Jonas Bergmeier',
            info: 'http://jonasbergmeier.net'
        },
        {
            id: '602ece8d9c28aca6e45a602ece8d9c28',
            name: 'Alexander Barnickel',
            info: 'http://alba.io'
        },
        {
            id: 'ecb66435f42c7bb716b20b0d887d83a9',
            name: 'André König',
            info: 'http://andrekoenig.info'
        },
    ];

    mock
        .get('/' + version + '/persons')
        .reply(200, JSON.stringify(persons));

    mock
        .get('/' + version + '/persons/a70ac98f6379aca6e45a602ece8d9c28')
        .reply(200, JSON.stringify(persons[1]));

    mock
        .get('/' + version + '/persons/foo')
        .reply(404, http.STATUS_CODES[404]);
};
