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

var VError = require('verror');

var services = {
    person: require('./person')
};

module.exports = function instantiate (type) {
    var endpoint = process.env.ENDPOINT || 'https://api.cahoots.pw/v1';
    var service = services[type];

    if (!service) {
        throw new VError('failed to return service %s', type);
    }

    return service(endpoint);
};
