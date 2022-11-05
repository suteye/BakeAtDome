//const {google} = require("googleapis");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Employee = require("../model/EmployeeSchema");
const ErrorResponse = require("../utils/errorResponse");

dotenv.config();

/*async function getAuthSheets(){
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client});
    
    const spreadsheetId = process.env.SHEET_ID;
    
    return{
        auth,
        client,
        googleSheets,
        spreadsheetId,
    };
}

getAuthSheets().catch(console.error);*/

exports.Login = async (req, res,next) => {
    const {username, password} = req.body;
    if(!username || !password){
        return next(new ErrorResponse("กรุณากรอก Username และ Password ให้ครบถ้วน", 400));
    }
    try{
        const  user = await Employee.findOne({ employeeEmail: username }).select("+employeePassword");
       
       if(!user){
            return next(new ErrorResponse("Username หรือ Password ไม่ถูกต้อง", 404));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return next(new ErrorResponse("Username หรือ Password ไม่ถูกต้อง", 401));
        }
        res.status(200).json({ 
            success: true, 
            message: "เข้าสู่ระบบสำเร็จ",
            token: user.getSignedJwtToken()
        });

    }catch(err){
        next(err);
    }
}

//forget password
/*exports.forgotPassword = async (req, res, next) => {
    const {email} = req.body;
    try{
        const user = await Employee.findOne({ employeeEmail: email });
        if(!user){
            return next(new ErrorResponse("ไม่พบอีเมลนี้ในระบบ", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
        const message = `
            <h1>คุณได้รับอีเมลนี้เนื่องจากคุณได้ทำการขอรีเซ็ตรหัสผ่าน สำหรับ BAKE@DOME </h1>
            <p>กรุณาคลิกลิงค์ด้านล่างเพื่อทำการรีเซ็ตรหัสผ่านของคุณ</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try{
            await sendEmail({
                to: user.email,
                subject: "รีเซ็ตรหัสผ่าน",
                text: message
            });

            res.status(200).json({ success: true, data: "อีเมลถูกส่งไปยังอีเมลของคุณแล้ว" });
        } catch(err){
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("ไม่สามารถส่งอีเมลได้", 500));
        }
    } catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse("ไม่สามารถส่งอีเมลได้", 500));
    }
} */

