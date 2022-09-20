const express = require('express');
const {metadata, getRows,addRow,updateValue,deleteRow,getRowsbyId} = require('../controllers/dataController');
const router = express.Router();

router.get('/metadata',metadata);
router.get('/getRows',getRows);
router.post('/addRow',addRow);
router.put('/updateValue/:id',updateValue);
router.post('/deleteRow/:id',deleteRow);
router.get('/getRowsbyId/:id',getRowsbyId);


module.exports = router;