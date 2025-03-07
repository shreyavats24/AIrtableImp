const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");
const taskController = require("../controllers/taskController.js");

router.post('/login',AuthController.loginUser);
router.post('/signUp',AuthController.signupUser)

module.exports = router;