import express, {type Application, type Router} from 'express';
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import setDatabaseConnection from '../database/dbConnection';


interface configType{
  dbName?:string,
  allowedOrigins?:string[],
  servicePort:number,
  routes?:Router[]
}

export async function startServer(config:configType){

  const app :Application= express();
  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
     origin:config.allowedOrigins || [],
     credentials:true
  }));

 if(config.dbName){
   const connection = await setDatabaseConnection(config.dbName || "");
   if(!connection.status){
     console.error("Database connection failed:", connection.message);
     process.exit(1);
   }
   console.log(connection.message);
 }
  
  app.listen(config.servicePort, ()=>{
    console.log(`Server Listening at ${config.servicePort}`);
  })

  config.routes?.forEach((route)=>{
    app.use(route);
  })

}

export default startServer;

