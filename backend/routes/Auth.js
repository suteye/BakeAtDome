const express = require('express');
const {Login, Logout} = require('../controllers/AuthController');
const router = express.Router();

router.post('/login',Login);
//router.delete('/logout',Logout);

module.exports = router;