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

var xhr = require('xhr');
var VError = require('verror');

module.exports = BaseService;

function BaseService (endpoint) {
    this.endpoint = endpoint;

    this.$headers = {
        'Content-Type': 'application/json'
    };
}

BaseService.prototype.$fireGET = function $fireGET (resource, query, callback) {
    var self = this;
    var uri = this.$endpoint + resource;

    if (typeof query === 'function') {
        callback = query;
        query = {};
    }

    // TODO: Append query parameter

    function onResponse (err, resp, body) {
        if (err) {
            return callback(new VError(err, 'failed to perform a HTTP GET request'));
        }

        callback(null, resp.statusCode, body);
    }

    xhr({
        uri: uri,
        headers: self.$headers
    }, onResponse);
};
