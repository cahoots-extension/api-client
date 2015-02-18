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
    var service = new PersonService(endpoint);

    return {
        findAll: service.findAll.bind(service),
        findById: service.findById.bind(service)
    };
};

function PersonService (endpoint) {
    BaseService.call(this, endpoint);
}

util.inherits(PersonService, BaseService);

PersonService.prototype.findAll = function findAll (callback) {
    var self;

    mandatory(callback).is('function', 'PersonService: findAll - Please define a proper callback function.');

    self = this;

    function onGET (err, persons) {
        if (err) {
            return callback(self.$createError(err, 'failed to find all persons.'));
        }

        callback(null, persons);
    }

    this.$fireGET('/persons', onGET);
};

PersonService.prototype.findById = function findById (id, callback) {
    var self;

    mandatory(id).is('string', 'PersonService: findById - Please define a person id.');
    mandatory(callback).is('function', 'PersonService: findById - Please define a proper callback function.');

    self = this;

    function onGET (err, person) {
        if (err) {
            return callback(self.$createError(err, 'failed to find the person with the id: %s.', id));
        }

        callback(null, person);
    }

    this.$fireGET('/persons/' + id, onGET);
};
