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

describe('The OrganizationService', function suite () {

    it('should be able to find all organizations', function test (done) {
        var service = services('organization');

        function onFind (err, organizations) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('NotFoundError');

            expect(organizations).to.be(undefined);

            done();
        }

        service.findAll(onFind);
    });
});
