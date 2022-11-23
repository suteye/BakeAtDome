const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connection = require('./config/connection');
const  product = require('./routes/Product');
const auth = require('./routes/Auth');
const employees = require('./routes/Employees');


require('colors');

dotenv.config();


const app = express();

//middlewares 
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) 
app.use(morgan("dev"));




//connect to database
connection();

//routes
app.use('/api/products', product);
app.use('/api/auth', auth);
app.use('/api/employees',employees)

//error handler middleware (should be last piece of middleware)
app.use(errorHandler);

///port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});
