const app = require('./app');
// const ErrorHandler = require('../backEnd/utils/errorHandler');

const cloudinary = require('cloudinary');




// Uncaught Exception -> this should come first 
// before the actual encounter
// isley upar likha h
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${ err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit();

})


// Config

if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({path:'./backend/config/config.env'});
}





const connectDataBase = require('./config/dataBase');





// Connecting to dataBase
connectDataBase();



// setting up cloudinary          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure:true
});



const server = app.listen(process.env.port,()=>{
  
    console.log(`Server is working of http://localhost:${process.env.port}`);

});




// Unhandled promise rejection
// For example when connection string might bt wrong
// for ex ->DATABASE = mongo+srv://siddharth_878:<PASSWORD>@cluster1.c6crl26.mongodb.net/EcommerceFinal?retryWrites=true&w=majorityDATABASE = mongodb+srv://siddharth_878:<PASSWORD>@cluster1.c6crl26.mongodb.net/EcommerceFinal?retryWrites=true&w=majority
// is written in place of DATABASE = mongodb+srv://siddharth_878:<PASSWORD>@cluster1.c6crl26.mongodb.net/EcommerceFinal?retryWrites=true&w=majority

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);

    server.close(()=>{
        process.exit();
    })
})