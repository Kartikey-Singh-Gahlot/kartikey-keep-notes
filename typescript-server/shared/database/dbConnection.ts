import mongoose from "mongoose";


async function setDatabaseConnection(dbName:string):Promise<{status:boolean,message:string }>{
    const connectionString:string=`${process.env.MONGO_DB_CONNECTION_STRING}/${dbName}`
    try{
      await mongoose.connect(connectionString);
      return {status:true, message:"Database Connected"};
    }
    catch(err:any){
      console.error(err.stack || err);
      return {status:false, message:err.message};
    }
}

export default setDatabaseConnection;