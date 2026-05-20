import mongoose from "mongoose"
import "dotenv/config" 

const setDataBaseConnection = async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "localhost");
    }
    catch(err){
      throw err;
    }
}

export default setDataBaseConnection;