const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const login = require("../controllers/loginController");
const [ validate, handleValidationErrors ] = require('../middlewares/validateLogInForm');
const [ compare ] = require("../middlewares/hashPassword");

/* GET login page. */
router.get('/', (req, res, next) => res.render('log-in'));

router.post(
    '/', 
    validate, 
    handleValidationErrors, 
    compare,
    //auth
    login
);

module.exports = router;