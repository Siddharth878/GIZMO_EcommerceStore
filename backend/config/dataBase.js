const mongoose = require('mongoose');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',process.env.dataBase_password
  );
  
  
  
  
 const connectDataBase = () =>{
  mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(con=>{
    // console.log(con.connection);
    console.log("Connection SuccesFull");
  });

}


module.exports = connectDataBase;
