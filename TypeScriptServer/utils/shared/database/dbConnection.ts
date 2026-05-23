import mongoose from "mongoose";


async function setDatabaseConnection(dbURL:string):Promise<{status:boolean,message:string }>{
    try{
      await mongoose.connect(dbURL);
      return {status:true, message:"Database Connected"};
    }
    catch(err:any){
      return {status:false, message:err.message};
    }
}

export default setDatabaseConnection;