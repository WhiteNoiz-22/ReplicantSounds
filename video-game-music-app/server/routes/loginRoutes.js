const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController");

// Login Routes
router.post('/login', loginController.loginUser);

module.exports = router;
