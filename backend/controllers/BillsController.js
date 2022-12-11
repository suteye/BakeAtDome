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
    //create bill id in format of "ddmmyy-0001
    const billId = new Date().toLocaleDateString().replace(/\//g,'') + "-" + ("0000" + (await Bills.countDocuments() + 1)).slice(-4);

    //create new bill
    try{
    const newBill = await Bills.create(
        {
            billId: billId,
            paymentMethod: paymentMethod,
            cartItems: req.body.cartItems,
        }
    ); 
        res.status(201).json({
            success: true,
            message:"ชำระเงินสำเร็จ",
            newBill
        });
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถสร้างใบเสร็จได้", 500));
    }

}

exports.summary = async (req, res,next) => {
    try{
        const sumIncome = await Bills.aggregate([
            {
                $group: {
                    _id: null,
                    price: { 
                       $sum: "$cartItems.price"
                    },
                },
            },
        ]);

        const sumOrder = await Bills.aggregate([
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1 //count all bills
                    },
                },
            },
        ]);

        const sumIncomeToday = await Bills.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)), //get date from 00:00:00
                        $lt: new Date(new Date().setHours(23, 59, 59, 999)), //get date to 23:59:59
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    price: {
                        $sum: "$cartItems.price" //sum all price in cartItems
                    },
                },
            },
        ]);

        const BestSeller = await Bills.aggregate([
            {
                $unwind: "$cartItems" //unwind cartItems
            },
            {
                $group: {
                    _id: "$cartItems.name",
                    count: {
                        $sum: "$cartItems.quantity" //sum all quantity in cartItems
                    },
                },
            },
            {
                $sort: {
                    count: -1 //sort by count
                },
            },
            {
                $limit: 1 //limit to 1
            },
        ]);

        const SaleIn24Hours = await Bills.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)), //get date from 00:00:00
                        $lt: new Date(new Date().setHours(23, 59, 59, 999)), //get date to 23:59:59
                    },
                },
            },
            {
                $unwind: "$cartItems" //unwind cartItems
            },
            {
                $group: {
                    _id: "$cartItems.name",
                    count: {$sum: "$cartItems.quantity"},//sum all quantity in cartItems
                    time: {$first: "$createdAt"}, //get first time
                },
            },
            {
                $sort: {
                    count: -1 //sort by count
                },
            },
            {
                $limit: 1 //limit to 1
            },
        ]);
        
        const TopfiveBestSeller = await Bills.aggregate([
            {
                $unwind: "$cartItems" //unwind cartItems
            },
            {
                $group: {
                    _id: "$cartItems.name",
                    count: {
                        $sum: "$cartItems.quantity" //sum all quantity in cartItems
                       
                    },
                },
            },
            {
                $sort: {
                    count: -1 //sort by count
                },
            },
            {
                $limit: 5 //limit to 5
            },
        ]);

        res.status(200).json({
            success: true,
            sumIncome,
            sumOrder,
            sumIncomeToday,
            BestSeller,
            SaleIn24Hours,
            TopfiveBestSeller
        });

    } catch(err){
        //return next(new ErrorResponse("ไม่สามารถดึงข้อมูลได้", 500));
        console.log(err);
    }
}
