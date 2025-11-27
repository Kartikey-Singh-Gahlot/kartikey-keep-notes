const mongoose = require('mongoose');
require('dotenv').config();

const setDataBaseConnection = async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    }
    catch(err){
      throw err;
    }
}

module.exports = setDataBaseConnection;