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

describe('The PersonService', function suite () {

    before(mock.boot);
    after(mock.shutdown);

    it('should be able to find all persons', function test (done) {
        var service = services('person');

        function onFind (err, persons) {
            expect(err).to.be(null);

            expect(persons.length).to.be(3);

            done();
        }

        service.findAll(onFind);
    });

    it('should be able to find a person by id', function test (done) {
        var service = services('person');

        function onFind (err, person) {
            expect(err).to.be(null);

            expect(person.id).not.to.be(undefined);
            expect(person.name).not.to.be(undefined);
            expect(person.info).not.to.be(undefined);

            done();
        }

        service.findById('a70ac98f6379aca6e45a602ece8d9c28', onFind);
    });

    it('should be able to handle accessing a non-existing person', function test (done) {
        var service = services('person');

        function onFind (err, person) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('NotFoundError');

            expect(person).to.be(undefined);

            done();
        }

        service.findById('foo', onFind);
    });

});
