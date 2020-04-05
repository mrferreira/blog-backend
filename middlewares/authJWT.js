const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require('../services/userService');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        res.status(403).send({
            message: 'No token provided.'
        });
    }

    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: 'unauthorized'
            })
        }
        req.userId = decoded.id;
        next();
    })
}

isManager = (req, res) => {
    return checkRole(req, res, 'Manager role is required.');
}

isAuthor = (req, res) => {
    return checkRole(req, res, 'Author role is required.');
}

checkRole = (req, res, errMsg ) => {
    userService.get(req.userId).then(user => {
        if(user.role !== db.ROLES.manager) {
            res.status(403).send({
                message: errMsg
            });
        }
        return;
    });
}

module.exports = {
    verifyToken,
    isManager, 
    isAuthor
}