const dotenv = require('dotenv');
const Employees = require('../model/EmployeeSchema');
const ErrorResponse = require('../utils/errorResponse');


dotenv.config();
//get all employees
exports.getEmployees = async (req, res,next) => {
    try{
        const employees = await Employees.find();
        res.status(200).json(employees);
    }catch(err){
        return next(new ErrorResponse("ไม่พบข้อมูลพนักงานในระบบ", 404));
    }
}

//add new employee to database
exports.addEmployees = async (req, res) => {
    const {employeeEmail, employeePassword, employeePosition, employeeName, employeePhone} = req.body;
    const newEmployee = new Employees({employeeEmail, employeePassword, employeePosition, employeeName, employeePhone});
    try{
        await newEmployee.save();
        res.status(201).json({
            newEmployee,
            message: 'เพิ่มพนักงานสำเร็จ',
            token: newEmployee.getSignedJwtToken()
        });

    } catch(err){
        return next(new ErrorResponse("ไม่สามารถเพิ่มพนักงานได้", 409));
    }
}

//save updated employee to database
exports.updateEmployees = async (req, res) => {
    const employee_info = req.body;
    const updatedEmployee = new Employees(employee_info);
    try{
        await Employees.findByIdAndUpdate({_id: req.body.employeeId}, updatedEmployee);
        res.status(201).json({
            message: 'แก้ไขข้อมูลพนักงานสำเร็จ',
            updatedEmployee
        });
    } catch(err){
        return next(new ErrorResponse("ไม่สามารถแก้ไขข้อมูลพนักงานได้", 409));
    }
}

//delete employee from database
exports.deleteEmployees = async (req, res) => {
    try{
        await Employees.findOneAndDelete({_id: req.body.employeeId});
        res.status(201).json({message: 'ลบพนักงานสำเร็จ'});
    }catch(err){
        return next(new ErrorResponse("ไม่สามารถลบพนักงานได้", 409));
    }
}


