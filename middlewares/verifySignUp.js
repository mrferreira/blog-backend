const db = require('../models');
const ROLES = db.ROLES;
const userService = require('../services/userService');

checkDuplicatedEmail = (req, res, next) => {
    userService.getByEmail(req.body.username).then(user => {
        if(user) {
            res.status(400).send({
                message: 'Failed! Username already in use'
            });
            return;
        }
    })
}

checkRolesExist = (req, res, next) => {
    if(req.body.roles) {
        req.body.roles.forEach( role => {
            if(!ROLES.includes(role)) {
                res.status(400).send({
                    message: 'Failed! Role does not exist: ' + role
                })
                return;
            }
        })
    }
}

modules.export = {
    checkDuplicatedEmail,
    checkRolesExist
}