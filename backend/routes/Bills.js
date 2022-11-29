const express = require('express');
const router = express.Router();
const {getBill,createBill,summary} = require('../controllers/BillsController');


router.get('/',getBill);
router.post('/create',createBill);
router.get('/summary', summary);

module.exports = router;