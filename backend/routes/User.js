const express = require('express');
const {metadata, Register} = require('../controllers/UserController');
const router = express.Router();

router.get('/metadata',metadata);
router.post('/register',Register);

module.exports = router;