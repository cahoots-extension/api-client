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

var util = require('util');

var mandatory = require('mandatory');

var BaseService = require('./base');

module.exports = function instantiate (endpoint) {
    var service = new AccountService(endpoint);

    return {
        authenticate: service.authenticate.bind(service)
    };
};

function AccountService (endpoint) {
    BaseService.call(this, endpoint);
}

util.inherits(AccountService, BaseService);

AccountService.prototype.authenticate = function authenticate (email, password, callback) {
    var self = this;
    var options = {};

    mandatory(email).is('string', 'Please provide an email address.');
    mandatory(password).is('string', 'Please provide a password.');

    options.body = {
        email: email,
        password: password
    };

    function onPOST (err, account) {
        if (err) {
            return callback(self.$createError(err, 'login failed.'));
        }

        self.$token = account.token;

        callback(null, account);
    }

    this.$firePOST('/tokens', options, onPOST);
};
