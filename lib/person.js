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
var VError = require('verror');

var BaseService = require('./base');

module.exports = function instantiate (endpoint) {
    var service = new PersonService(endpoint);

    return {
        findAll: service.findAll.bind(service)
    };
};

function PersonService (endpoint) {
    BaseService.call(this, endpoint);
}

util.inherits(PersonService, BaseService);

PersonService.prototype.findAll = function findAll (callback) {
    mandatory(callback).is('function', 'PersonService: findAll - Please define a proper callback function.');

    function onGET (err, status, persons) {
        if (err || status !== 200) {
            return callback(new VError(err, 'failed to load all persons. Status: %d', status));
        }

        callback(null, persons);
    }

    this.$fireGET('/persons', onGET);
};
