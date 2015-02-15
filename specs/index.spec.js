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

var expect = require('expect.js');

var services = require('../');

describe('The cahoots-api-client service factory', function suite () {
    it('should be able to return a service', function test (done) {
        var service = services('person');

        expect(service.findAll).not.to.be(undefined);

        done();
    });
});
