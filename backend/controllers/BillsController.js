const dotenv = require('dotenv');
const Bills = require('../model/BillsSchema');
const ErrorResponse = require('../utils/errorResponse');

dotenv.config();

exports.getBill = async (req, res,next) => {
    try{
        const bills = await Bills.find();
        res.status(200).json(bills);
    }catch(err){
        return next(new ErrorResponse("ไม่พบข้อมูลใบเสร็จในระบบ", 404));
    }
}

exports.createBill = async (req, res,next) => {
    const {paymentMethod} = req.body;

    //validate
    if(!paymentMethod){
        return next(new ErrorResponse("กรุณากรอกข้อมูลให้ครบถ้วน", 400));
    }

    //create new bill
    try{
    const newBill = await Bills.create(req.body); 
        res.status(201).json({
            success: true,
            message:"ชำระเงินสำเร็จ",
            newBill
        });
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถสร้างใบเสร็จได้", 500));
    }

}

