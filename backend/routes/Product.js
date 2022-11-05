const express = require('express');
const {metadata, getProducts,addProduct,updateValue,deleteRow,getRowsbyId} = require('../controllers/ProductController');
const router = express.Router();

router.get('/metadata',metadata);
router.get('/getProducts',getProducts);
router.post('/addProduct',addProduct);
router.put('/updateValue/:id',updateValue);
router.post('/deleteRow/:id',deleteRow);
router.get('/getRowsbyId/:id',getRowsbyId);


module.exports = router;