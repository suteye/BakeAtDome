const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employees = require('../model/EmployeeSchema');
const Product = require('../model/ProductSchema');
const Bills = require('../model/BillsSchema');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        
        
        const emp =[
            {
                _id: 0,
                employeeEmail: "sutima.phe@dome.tu.ac.th",
                employeePassword: "$2a$10$kBgFBG.EjGfsDBBJhq4iPO4Megd0tbcNuxEYw16t3nrD96kARR4i6",
                employeePosition: "พนักงานฝ่ายผลิต",
                employeeName: "สุธิมา เพชรเสถียร",
                employeePhone: "0634659559",
                __v: 0
            }
        ]

        const product = [
            {
                _id: 0,
                category: "อื่นๆ",
                name: "ขาไก่อบกรอบ",
                price: 15,
                quantity: 50,
                image: "http://backend.snnp.co.th/media/products/2018/thumbnail/9ec96159b457751eb5c56a5de3f8c85d96b654eb.png",
                productStatus: "1",
                __v: 0
            }
        ]

        const bill = [
            {
                _id: 0,
                billId: "11292022-0001",
                paymentMethod: "เงินสด",
                cartItems: [
                    {
                    _id: 0,
                    category: "อื่นๆ",
                    name: "ขาไก่อบกรอบ",
                    price: 15,
                    quantity: 1,
                    image: "http://backend.snnp.co.th/media/products/2018/thumbnail/9ec96159b457751eb5c56a5de3f8c85d96b654eb.png",
                    productStatus: "1",
                    __v: 0
                    }
                ],
                __v: 0
            }
        ]


       
        //insert data to collection once only 
        if((await Employees.find()).length === 0){
            await Employees.insertMany(emp);
            console.log("Data Inserted");
        }
        if((await Product.find()).length === 0){
            await Product.insertMany(product);
            console.log("Data Inserted");
        }
        if((await Bills.find()).length === 0){
            await Bills.insertMany(bill);
            console.log("Data Inserted");
        }

        //  const result = await Employees.insertMany(emp);
        // console.log(result);


    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }



}

module.exports = connectDB;