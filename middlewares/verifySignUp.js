const db = require('../models');
const ROLES = db.ROLES;
const userService = require('../services/userService');

checkDuplicatedEmail = (req, res, next) => {
    userService.getByEmail(req.body.email).then(user => {
        if(user) {
            res.status(400).send({
                message: 'Failed! email already in use'
            });
        }
    })
    next();
}

checkRolesExist = (req, res, next) => {
    if(req.body.roles) {
        req.body.roles.forEach( role => {
            if(!Object.values(ROLES).includes(role)) {
                res.status(400).send({
                    message: 'Failed! Role does not exist: ' + role
                })
            }
        })
    }
    next();
}

module.exports = {
    checkDuplicatedEmail,
    checkRolesExist
}