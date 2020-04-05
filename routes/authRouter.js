const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');
const { verifySignUp } = require('../middlewares')

router.post(`${process.env.BASE_URL}/auth/signup`, 
    [
        verifySignUp.checkDuplicatedEmail, verifySignUp.checkRolesExist
    ],(req, res, next) => {    
    userService.save({
        name:  req.body.name,
        email:  req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        let role;
        if(req.body.roles) {
            role = Object.values(db.ROLES).filter(f => f === req.body.roles[0]);
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
    userService.getByEmail(req.body.username).then(user => {
        if(!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }
        let passwdValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwdValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!'
            });
        }
        let token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
            expiresIn: 86400 //24 hours
        });
        return res.status(200).send({
            id: user.id,
            username: user.email,
            roles: [user.role],
            accessToken: token
        });        
    })
    .catch(err => {
        return res.status(500).send({ message: err.message });
    });
});

module.exports = router;