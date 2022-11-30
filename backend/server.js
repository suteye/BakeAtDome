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
const bills = require('./routes/Bills');
const { createProxyMiddleware } = require('http-proxy-middleware');


require('colors');

dotenv.config();


const app = express();




//middlewares 
app.use(cors());

//http proxy middleware
const apiProxy = createProxyMiddleware('/api/*', { 
    target: 'http://127.0.0.1:5500', //backend server
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    secure: false, // if you want to verify the SSL Certs
    logLevel: 'debug' // log level for proxy
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) 
app.use(morgan("dev"));




//connect to database
connection();

//routes
app.use('/api/products', product)
app.use('/api/auth', auth)
app.use('/api/employees',employees)
app.use('/api/bills',bills)

//error handler middleware (should be last piece of middleware)
app.use(errorHandler);

///port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});
