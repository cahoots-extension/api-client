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

var superagent = require('superagent');
var JSON3 = require('json3');
var VError = require('verror');

var errortypes = {
    400: 'ValidationError',
    401: 'UnauthorizedError',
    403: 'InvalidTokenError',
    404: 'NotFoundError',
    500: 'APIUnavailableError',
    parse: 'ParseError',
    network: 'NetworkError'
};

module.exports = BaseService;

function BaseService (endpoint) {
    this.$endpoint = endpoint;

    this.$headers = {
        'Content-Type': 'application/json'
    };

    // Will be added when the authentication process has been performed.
    this.$token = null;
}

BaseService.prototype.$createError = function $createError (err, message) {
    var error = null;

    error = new Error(message);
    error.name = err.name;
    error.cause = err;

    return error;
};

BaseService.prototype.$request = function $request (verb, resource, params, callback) {
    var uri = this.$endpoint + resource;

    function onResponse (err, res) {
        var error = null;

        if (err) {
            error = new VError(err, 'failed to communicate with the cahoots API.');

            error.name = errortypes.network;

            return callback(error);
        }

        if (res.status < 200 || res.status >= 300) {
            error = new VError('API sent an error response.');
            error.name = errortypes[res.status];

            return callback(error);
        }

        try {
            return callback(null, JSON3.parse(res.text));
        } catch (err) {
            error = new VError(err, 'Unable to parse API response.');
            error.name = errortypes.parse;

            return callback(error);
        }
    }

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    superagent[verb.toLowerCase()](uri)
        .set(this.$headers)
        .query(params.query)
        .send(params.body)
        .end(onResponse);
};

BaseService.prototype.$fireGET = function $fireGET (resource, params, callback) {
    function onResponse (err, body) {
        var error = null;

        if (err) {
            error = new VError(err, 'failed to perform HTTP GET request');
            error.name = err.name;

            return callback(error);
        }

        callback(null, body);
    }

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    this.$request('GET', params, onResponse);
};
