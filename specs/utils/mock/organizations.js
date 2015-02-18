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

    var organizations = [
        {
            id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
            name: 'Cahoots Foundation',
            uri: 'https://cahoots.pw'
        },
        {
            id: 'f94423e4f94423e4cf03cff7a4415f79986ee4dc',
            name: 'Münchner Sicherheitskonferenz',
            uri: 'http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz'
        },
        {
            id: '16025162581bd47bb1b8acab725e42c16f75c840',
            name: 'Valdai Discussion Club',
            uri: 'http://en.wikipedia.org/wiki/Valdai_International_Discussion_Club'
        }
    ];

    mock
        .get('/' + version + '/organizations')
        .reply(200, JSON.stringify(organizations));

    mock
        .get('/' + version + '/organizations/f94423e4f94423e4cf03cff7a4415f79986ee4dc')
        .reply(200, JSON.stringify(organizations[1]));

    mock
        .get('/' + version + '/organizations')
        .query({ids: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b,f94423e4f94423e4cf03cff7a4415f79986ee4dc'})
        .reply(200, JSON.stringify(organizations.splice(0, 2)));

    mock
        .get('/' + version + '/organizations/foo')
        .reply(404, http.STATUS_CODES[404]);

};
