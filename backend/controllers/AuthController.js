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

exports.Login = async (req, res,next) => {
    const {username, password} = req.body;
    try{
        const {googleSheets, auth,spreadsheetId} = await getAuthSheets();
        const rows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "users!A4:G",
            valueRenderOption: "FORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING",
        });
        //array to json object like {name: "name", price: "price", description: "description"}
        const users = rows.data.values.map((row) => {
            return {
                username: row[0],
                password: row[1],
                email: row[2],
                role: row[3],
                firstname: row[4],
                lastname: row[5],
                phone: row[6],
            };
        });
        //check if username exists

        const user = users.find((user) => user.username === username);
        if(!user){
            return res.status(400).json({msg: "Username does not exist"});
        }
        //check if password matches
        const checkPasss = await bcrypt.compare(password, user.password, (err, result) => {
            /*  if(result) {
                return true
              } else {
                return false
            } */
            if(err){
                return res.status(400).json({msg: "Password is incorrect"});
            }
            if(result){
                return res.status(200).json({msg: "Login successful"});
            } 
        });

        //check role and return token
       
    }catch(err){
        next(err);
    }
}