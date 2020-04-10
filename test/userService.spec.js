const assert = require('assert');
const userService = require('../services/userService');

describe('Save new User', () => {
    const user = {
        "name": "Testing User",
        "email": "testing.user@email.com",
        "password": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg2MTA4Mzc5LCJleHAiOjE1ODYxOTQ3Nzl9.ubEJlzjYJdeWQpGwq0yuH6wWz2k9XwUT4Dggphg1w7g",
        "role": "tester"
    };

    userService.save(user).then(res => {
        it('should return the newly saved user', () => assert.ok(res != null));
        it('should return the newly saved user id', () => assert.ok(res.id != null));
        it('should return the newly saved user name', () => assert.equal(res.name, user.name));
    });

});