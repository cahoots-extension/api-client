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

describe('The PersonService', function suite () {

    it('should be able to find all persons', function test (done) {
        var service = services('person');

        function onFind (err, persons) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('NotFoundError');

            expect(persons).to.be(undefined);

            done();
        }

        service.findAll(onFind);
    });

});
