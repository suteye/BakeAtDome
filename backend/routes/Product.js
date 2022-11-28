const express = require('express');
const router = express.Router();
const {createProduct,getProducts,deleteProduct,updateProduct} = require('../controllers/ProductController');

router.post('/create', createProduct);
router.get('/',getProducts);
router.delete('/:id',deleteProduct);
router.put('/update',updateProduct);


module.exports = router;