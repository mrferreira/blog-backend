const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

router.post(`${process.env.BASE_URL}/auth/signup`, (req, res, next) => {
    userService.save({
        name:  req.body.name,
        email:  req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        let role;
        if(req.body.roles) {
            role = db.ROLES.filter(f => f === req.body.roles);
            role = role.length > 0 ? role[0] : db.ROLES.user;
        } else {
            role = db.ROLES.user;
        }
        userService.setRole(user.id, role);
        res.status(201).send({
            message: 'User was registered successfully'
        });
    });
});

router.post(`${process.env.BASE_URL}/auth/login`, (req, res, next) => {

});

module.exports = router;