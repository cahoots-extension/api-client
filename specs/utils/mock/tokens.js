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

    var account = {
        id: '64f9567684863e2e28d7d3e2a507c6fd1d1e3be6',
        token: 'ee03a9d32d2d83c362147541c2ed2fe85161f1f7',
        name: {
            first: 'André',
            last: 'König'
        },
        email: 'andre.koenig@cahoots.pw'
    };

    mock
        .post('/' + version + '/tokens')
        .send({email: 'andre.koenig@cahoots.pw', password: 'test123'})
        .reply(200, JSON.stringify(account));

    mock
        .post('/' + version + '/tokens')
        .send({email: 'andre.koenig@cahoots.pw', password: 'wrongpw'})
        .reply(400, http.STATUS_CODES[400]);

};
