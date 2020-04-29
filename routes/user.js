/** @format */

var express = require("express");
const Router = require('express-promise-router');
const router = new Router();
const controller = require("../controllers/userController");
const validate = require("../middlewares/validateSignUpForm");
const hash = require("../middlewares/hashPassword");

/* GET sign up form */
router.get("/", controller.getSignUp);

/* GET user profile. */
router.get("/:username", controller.getUserProfile);

/* POST sign up form */
router.post(
    "/", 
    validate.checks, 
    validate.handleValidationErrors, 
    hash,
    controller.addUser
);

module.exports = router;
