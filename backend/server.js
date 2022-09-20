const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const  data = require('./routes/data');

require('colors');

dotenv.config();


const app = express();

//middlewares 
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) 
app.use(morgan("dev"));

//routes
app.use('/api/', data);
///port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});