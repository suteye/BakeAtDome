const express = require('express');
const router = express.Router();
const {getBill,createBill} = require('../controllers/BillsController');


router.get('/',getBill);
router.post('/create',createBill);

module.exports = router;