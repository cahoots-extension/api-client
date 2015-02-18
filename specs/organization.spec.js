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
var mock = require('./utils/mock/');

describe('The OrganizationService', function suite () {

    before(mock.boot);
    after(mock.shutdown);

    it('should be able to find all organizations', function test (done) {
        var service = services('organization');

        function onFind (err, organizations) {
            expect(err).to.be(null);

            expect(organizations.length).to.be(3);

            done();
        }

        service.findAll(onFind);
    });

    it('should be able to find an organization by id', function test (done) {
        var service = services('organization');

        var id = 'f94423e4f94423e4cf03cff7a4415f79986ee4dc';

        function onFind (err, organization) {
            expect(err).to.be(null);

            expect(organization.id).to.be(id);
            expect(organization.name).not.to.be(undefined);
            expect(organization.uri).not.to.be(undefined);

            done();
        }

        service.findById(id, onFind);
    });

    it('should be able to handle a non-existing organization entry', function test (done) {
        var service = services('organization');

        function onFind (err, organization) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('NotFoundError');

            expect(organization).to.be(undefined);

            done();
        }

        service.findById('foo', onFind);
    });

    it('should be able to find organizations by multiple ids', function test (done) {
        var service = services('organization');

        var ids = [
            'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
            'f94423e4f94423e4cf03cff7a4415f79986ee4dc'
        ];

        function onFind (err, organizations) {
            expect(err).to.be(null);

            expect(organizations.length).to.be(2);

            done();
        }

        service.findByIds(ids, onFind);
    });
});
