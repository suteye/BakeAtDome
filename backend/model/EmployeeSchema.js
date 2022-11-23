const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const EmployeeSchema = new mongoose.Schema({
    employeeEmail: {
        type: String,
        required: [true, 'กรุณากรอกอีเมล'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "กรุณากรอกอีเมลให้ถูกต้อง"
          ],
    },
    employeePassword: {
        type: String,
        required: [true, 'กรุณากรอกรหัสผ่าน'],
    },
    employeePosition:{
        type: String,
        required: [true, 'กรุณากรอกประเภทผู้ใช้งาน'],
    },
    employeeName: {
        type: String,
        required: [true, 'กรุณากรอกชื่อ'],
    },
    employeePhone: {
        type: String,
        required: [true, 'กรุณากรอกเบอร์โทรศัพท์'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
    EmployeeSchema.pre('save', async function(next) {
        if(!this.isModified('employeePassword')){
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.employeePassword = await bcrypt.hash(this.employeePassword, salt);
        next();
    });

    EmployeeSchema.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.employeePassword);
    }

    EmployeeSchema.methods.getSignedJwtToken = function() {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
    }

    EmployeeSchema.methods.getResetPasswordToken = function() {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 minutes
        return resetToken;
    }
    autoIncrement.initialize(mongoose.connection);
    EmployeeSchema.plugin(autoIncrement.plugin, 'employees');
    const employees = mongoose.model('employees', EmployeeSchema);

module.exports = employees;

    