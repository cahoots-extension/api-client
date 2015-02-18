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
    var service = new OrganizationService(endpoint);

    return {
        findAll: service.findAll.bind(service),
        findById: service.findById.bind(service),
        findByIds: service.findByIds.bind(service)
    };
};

function OrganizationService (endpoint) {
    BaseService.call(this, endpoint);
}

util.inherits(OrganizationService, BaseService);

OrganizationService.prototype.findAll = function findAll (callback) {
    var self;

    mandatory(callback).is('function', 'OrganizationService: findAll - Please define a proper callback function.');

    self = this;

    function onGET (err, organizations) {
        if (err) {
            return callback(self.$createError(err, 'failed to find all organizations.'));
        }

        callback(null, organizations);
    }

    this.$fireGET('/organizations', onGET);
};

OrganizationService.prototype.findById = function findById (id, callback) {
    var self;

    mandatory(id).is('string', 'OrganizationService: findById - Please define a proper organization id.');
    mandatory(callback).is('function', 'OrganizationService: findById - Please define a proper callback function.');

    self = this;

    function onGET (err, organization) {
        if (err) {
            return callback(self.$createError(err, 'failed to find the organization with the id: ' + id));
        }

        callback(null, organization);
    }

    this.$fireGET('/organizations/' + id, onGET);
};

OrganizationService.prototype.findByIds = function findByIds (ids, callback) {
    var self;
    var params = {};

    mandatory(ids).is('array', 'OrganizationService: findByIds - Please define a proper array with multiple organization ids.');
    mandatory(callback).is('function', 'OrganizationService: findByIds - Please define a proper callback function.');

    self = this;

    function onGET (err, organizations) {
        if (err) {
            return callback(self.$createError(err, 'failed to find all organizations by multiple ids: %j', ids));
        }

        callback(null, organizations);
    }

    params.query = {
        ids: ids.join(',')
    };

    this.$fireGET('/organizations', params, onGET);
};
