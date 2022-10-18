const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const  product = require('./routes/Product');
const user = require('./routes/User');
const auth = require('./routes/Auth');

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
app.use('/api/products', product);
app.use('/api/users', user);
app.use('/api/auth', auth);
///port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});