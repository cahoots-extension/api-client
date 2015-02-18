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

describe('The AccountService', function suite () {

    it('should be able to perform a login', function test (done) {
        var service = services('account');

        function onLogin (err, account) {
            expect(err).not.to.be(null);
            expect(err.name).to.be('ValidationError');

            expect(account).to.be(undefined);

            done();
        }

        service.authenticate('user@user.org', 'password', onLogin);
    });

});
