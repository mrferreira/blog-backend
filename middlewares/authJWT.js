const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require('../services/userService');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).json({
            message: 'No token provided.'
        });
    }
    
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'unauthorized'
            })
        }
        req.userId = decoded.id;
    });

    console.log('verify token ok');
    return next();
}

isManager = (req, res, next) => {
    checkRole(req, res, next, db.ROLES.manager, 'Manager role is required.');
    next();
}

isAuthor = (req, res, next) => {
    checkRole(req, res, db.ROLES.author, 'Author role is required.');
    next();
}

checkRole = (req, res, role, errMsg ) => {
    userService.get(req.userId).then(user => {
        console.log(`userId: ${req.userId} - user: ${user}`)

        if(user === null) {
            return res.status(404).json({
                message: `User ${req.userId} not found.`
            });
        }

        if(user.role !== role) {
            return res.status(401).json({
                message: errMsg
            });

        }
    })
    .catch(err => {
        console.log(err)
        return res.status(401).json({ message: errMsg});
    });
    console.log(`check role ${role} ok`);
}

module.exports = {
    verifyToken,
    isManager, 
    isAuthor
}