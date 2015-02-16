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

var url = require('url');
var querystring = require('querystring');

var http = require('http-https');
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

BaseService.prototype.$querystring = function $querystring (query) {
    var result = '';

    query = query || {};

    // Add the access token to the query string (if available)
    if (this.$token) {
        query.token = this.$token;
    }

    if (Object.keys(query).length) {
        result += '?';
        result += querystring.stringify(query);
    }

    return result;
};

BaseService.prototype.$request = function $request (options, callback) {
    var body = '';
    var status = 0;

    function onError (err) {
        var error = new VError(err, 'failed to communicate with the cahoots API.');
        error.type = errortypes.network;

        callback(error);
    }

    function onData (chunk) {
        body += chunk;
    }

    function onEnd () {
        var error = null;

        if (status < 200 || status >= 300) {
            error = new VError('API sent an error response.');
            error.type = errortypes[status];

            return callback(error);
        }

        try {
            body = JSON.parse(body);
        } catch (e) {
            error = new VError(e, 'Unable to parse API response.');
            error.type = errortypes.parse;

            return callback(error);
        }

        callback(null, body);
    }

    function onResponse (res) {
        status = res.statusCode;

        res.setEncoding('utf-8');

        res.on('error', onError);
        res.on('data', onData);
        res.on('end', onEnd);
    }

    http.request(options, onResponse)
        .on('error', onError)
        .end();
};

BaseService.prototype.$fireGET = function $fireGET (resource, query, callback) {
    var uri = '';
    var options = {};

    function onResponse (err, status, body) {
        var error = null;

        if (err) {
            error = new VError.WError(err, 'failed to perform a HTTP GET request.');
            error.type = err.type;

            return callback(error);
        }

        callback(null, body);
    }

    if (typeof query === 'function') {
        callback = query;
        query = {};
    }

    uri += this.$endpoint + resource + this.$querystring(query);

    options = url.parse(uri);
    options.headers = this.$headers;
    options.method = 'GET';

    this.$request(options, onResponse);
};

BaseService.prototype.$createError = function $createError (err, message) {
    var error = null;

    error = new Error(message);
    error.name = err.type;
    error.cause = err;

    return error;
};
