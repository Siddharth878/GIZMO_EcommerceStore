const express = require('express');

const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require("path");




// Config  (doubt -- > yahn par bhi kyun dala)
if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({path:'./backend/config/config.env'});
}



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());





//Route Imports

const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const orders = require("./routes/orderRoutes");
const payments = require("./routes/paymentRoutes");

app.use('/api/v1',products);
app.use('/api/v1',users);
app.use('/api/v1',orders);
app.use('/api/v1',payments);



app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


// Middleware of errors
app.use(errorMiddleware);

module.exports = app;



