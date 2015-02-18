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

var mock = require('./utils/mock');

var services = require('../');

describe('The AccountService', function suite () {

    before(mock.boot);
    after(mock.shutdown);

    it('should be able to perform a login', function test (done) {
        var service = services('account');

        function onLogin (err, account) {
            expect(err).to.be(null);

            expect(account.id).not.to.be(undefined);
            expect(account.token).not.to.be(undefined);
            expect(account.name.first).not.to.be(undefined);
            expect(account.name.last).not.to.be(undefined);
            expect(account.email).not.to.be(undefined);

            done();
        }

        service.authenticate('andre.koenig@cahoots.pw', 'test123', onLogin);
    });

    it('should be able to handle an invalid login', function test (done) {
        var service = services('account');

        function onLogin (err, account) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('ValidationError');

            expect(account).to.be(undefined);

            done();
        }

        service.authenticate('andre.koenig@cahoots.pw', 'wrongpw', onLogin);
    });

});
