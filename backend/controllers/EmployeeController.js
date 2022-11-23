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

// updated employee to database
exports.updateEmployees = async (req, res) => {
    const emp = await Employees.findById(req.body.employeeId);

    if(emp) {
        const {employeeEmail, employeePassword, employeePosition, employeeName, employeePhone} = emp;
        emp.employeeEmail = req.body.employeeEmail || employeeEmail;
        emp.employeePassword = req.body.employeePassword || employeePassword;
        emp.employeePosition = req.body.employeePosition || employeePosition;
        emp.employeeName = req.body.employeeName || employeeName;
        emp.employeePhone = req.body.employeePhone || employeePhone;

        const updatedEmployee = await emp.save();
        res.status(201).json({
            _id: updatedEmployee._id,
            employeeEmail: updatedEmployee.employeeEmail,
            employeePassword: updatedEmployee.employeePassword,
            employeePosition: updatedEmployee.employeePosition,
            employeeName: updatedEmployee.employeeName,
            employeePhone: updatedEmployee.employeePhone,
            message: 'แก้ไขข้อมูลพนักงานสำเร็จ'
        });
    } else {
        return next(new ErrorResponse("ไม่พบพนักงานในระบบ", 404));
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


