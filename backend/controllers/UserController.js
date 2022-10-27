const {google} = require("googleapis");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

async function getAuthSheets(){
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

getAuthSheets().catch(console.error);



exports.metadata = async (req, res,next) => {
    try{
        const {googleSheets, auth, spreadsheetId} = await getAuthSheets();
        const metadata = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        });
        res.status(200).json({
            success: true,
            data: metadata.data,
        });
    }catch(err){
        next(err);
    }
}

exports.Register = async (req, res,next) => {
     const {username, password, email,role,firstname, lastname, phone,confirmPassword} = req.body;
     //check if username is already taken
     /*if(await User.findOne({username})){
         return res.status(400).json({msg: "Username already taken"});
     } */

     //check password and confirm password match
       if(password !== confirmPassword){
            return res.status(400).json({msg: "Passwords do not match"});
        } 
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const {googleSheets, auth, spreadsheetId} = await getAuthSheets();
       
        const rows = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "users",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[username, hashedPassword, email,role, firstname, lastname, phone]]
            },
        });
        res.status(200).json({
            status: true,
            msg: "Created user successfully",
        });
    } catch(err){
        next(err)
        console.log(err);
        res.status(400).json({
            status: false,
            msg: "Failed to create user",
        });
    }
}