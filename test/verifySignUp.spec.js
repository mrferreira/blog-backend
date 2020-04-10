const assert = require('assert');
const userService = require('../services/userService');
const verifySignUp = require('../middlewares/verifySignUp');

describe('check for duplicated email', () => {
    const user = {
        "name": "Testing User",
        "email": "testing.user@email.com",
        "password": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg2MTA4Mzc5LCJleHAiOjE1ODYxOTQ3Nzl9.ubEJlzjYJdeWQpGwq0yuH6wWz2k9XwUT4Dggphg1w7g",
        "role": "tester"
    };

    it('should save valid user', () => {
        userService.save(user).then(res => {
            assert.ok(user != null);
        });
    });

    
    it('should block inserting user with duplicated email', () => {
        userService.save(user);    
        const req = { "body": { "email": user.email }};
        const res = prepareResponse('Failed! email already in use');
        verifySignUp.checkDuplicatedEmail(req, res, () => {});
    });
});

describe('check roles', () => {
    it('should allow valid role', () => {
        const res = prepareResponse(undefined);
        const reqOK = { "body": { "roles": ['user','manager', 'author']}};
        verifySignUp.checkRolesExist(reqOK, res, () => {});
    });

    it('should block invalid role', () => {
        const role = 'testerACMEXPTO';
        const res = prepareResponse(`Failed! Role does not exist: ${role}`);
        const reqOK = { "body": { "roles": [role]}};
        verifySignUp.checkRolesExist(reqOK, res, () => {});
    });
});

prepareResponse = (errorMessage) => {
    let res = {};
    res.status = st => {
        res.tmpStatus = st;
        return res;
    };        
    res.send = msg => {
        assert.equal(res.tmpStatus, 400);
        assert.equal(msg.message, errorMessage);
    };
    return res;
}