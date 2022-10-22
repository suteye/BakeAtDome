const {google} = require('googleapis');
const dotenv = require('dotenv');

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

exports.getProducts = async (req, res,next) => {
    try{
        const {googleSheets, auth,spreadsheetId} = await getAuthSheets();
        const rows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "products!A4:D",
            valueRenderOption: "FORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING",
        });
        //array to json object like {name: "name", price: "price", description: "description"}
        const products = rows.data.values.map((row) => {
            return {
                category: row[0],
                name: row[1],
                size: row[2],
                price: row[3],
            };
        });
        
        res.json(products);
        //res.send(rows.data.values);
    }catch(err){
        next(err);
    }
}

exports.addRow = async (req, res,next) => {
    try{
        const {googleSheets,auth, spreadsheetId} = await getAuthSheets();
        const {name, email, phone, message} = req.body;
        const rows = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[name, email, phone, message]],
            },
        });
        res.status(200).json({
            success: true,
            message: "Row added",
        });
    }catch(err){
        next(err);
    }
}

exports.updateValue = async (req, res,next) => {
    try{
        const {name, email, phone, message} = req.body;
        const {googleSheets, auth,spreadsheetId} = await getAuthSheets();
        const rows = await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `Sheet1!A${req.params.id}:D${req.params.id}`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[name, email, phone, message]],
                majorDimension: "ROWS",
            },
        });
        res.status(200).json({
            success: true,
            data: rows.data,
        });
    }catch(err){
        next(err);
    }
}



exports.deleteRow = async (req, res,next) => {
   try{
        const {googleSheets, auth,spreadsheetId} = await getAuthSheets();
        const rows = await googleSheets.spreadsheets.batchUpdate({
            auth, 
            spreadsheetId,
            resource: {
                
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 0,
                                dimension: "ROWS",
                                startIndex: req.params.id-1,
                                endIndex: req.params.id,
                            },
                        },
                    },
                ],
            },
        });
        res.status(200).json({
            success: true,
            data: rows.data,
        });
    } catch(err){
        next(err);
    }
}



exports.getRowsbyId = async (req, res,next) => {
    try{
        const {googleSheets, auth,spreadsheetId} = await getAuthSheets();
        const rows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Sheet1!A${req.params.id}:D${req.params.id}`,
            valueRenderOption: "FORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING",
        });
        res.send(rows.data.values);
    }catch(err){
        next(err);
    }
}

