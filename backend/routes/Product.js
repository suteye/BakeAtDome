const express = require('express');
const {createProduct,getProducts,deleteProduct,updateProduct} = require('../controllers/ProductController');
const router = express.Router();

router.post('/create', createProduct);
router.get('/',getProducts);
router.delete('/:id',deleteProduct);
router.put('/update',updateProduct);


module.exports = router;