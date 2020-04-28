/** @format */

var express = require("express");
const Router = require('express-promise-router');
const router = new Router();
const controller = require("../controllers/userController");
const validation = require("../controllers/validation");

/* GET sign up form */
router.get("/", controller.getSignUp);

/* GET user profile. */
router.get("/:username", controller.getUserProfile);

/* POST sign up form */
router.post(
    "/", 
    validation.checks, 
    validation.handleValidationErrors, 
    controller.addUser
);

module.exports = router;
