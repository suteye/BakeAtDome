const dotenv = require('dotenv');
const Products = require('../model/ProductSchema');
const ErrorResponse = require('../utils/errorResponse');

dotenv.config();


exports.getProducts = async (req, res,next) => {
    try{
        const products = await Products.find();
        //count total product but productStatus = 1 (available) 
        // const totalProduct = await Products.countDocuments({productStatus: 1});
        res.status(200).json(
            products
            // totalProduct
        );
    }catch(err){
        return next(new ErrorResponse("ไม่พบข้อมูลสินค้าในระบบ", 404));
    }
  //const products = await Products.find({ productStatus: "available" });
 // res.status(200).json(products);

}

exports.createProduct = async (req, res,next) => {
    const {name, category, quantity,price,image} = req.body;

    //validate
    if(!name || !category || !quantity || !price || !image ){
        return next(new ErrorResponse("กรุณากรอกข้อมูลให้ครบถ้วน", 400));
    }

    //handle duplicate name
    const chkproductName = await Products.findOne({ name });
    if(chkproductName){
        return next(new ErrorResponse("ชื่อสินค้านี้มีในระบบแล้ว", 409));
    }

    //create new product
    try{
    const newProduct = await Products.create({ 
            name,
            category,
            quantity,
            price,
            image
        }); 
        res.status(201).json({
            success: true,
            message: "สร้างสินค้าสำเร็จ",
            newProduct
        });
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถสร้างสินค้าได้", 500));
    }

}

exports.deleteProduct = async (req, res,next) => {
    const productId =  await Products.findById(req.params.id);
    //if product not found
    if(!productId){
        return next(new ErrorResponse("ไม่พบข้อมูลสินค้าในระบบ", 404));
    }

    //delete product
    try{
        await productId.remove();
        res.status(200).json({
            success: true, 
            message: "ลบสินค้าสำเร็จ"
        });
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถลบสินค้าได้", 500));
    }
}

exports.updateProduct = async (req, res,next) => {
    const id = req.body.productId;
    const product = await Products.findById(id);

    //if product not found
    if(!product){
        return next(new ErrorResponse("ไม่พบข้อมูลสินค้าในระบบ", 404));
    }

    //update product
    try{
        const updatedProduct = await Products.findOneAndUpdate({_id: id}, req.body,{new: true});
        res.status(200).json({
            success: true,
            message: "แก้ไขสินค้าสำเร็จ",
            updatedProduct
        });
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถแก้ไขสินค้าได้", 500));
    }
    
}