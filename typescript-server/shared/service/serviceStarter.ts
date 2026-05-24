import express, {type Application, type Router} from 'express';
import "dotenv/config";
import cors from "cors";
import setDatabaseConnection from '../database/dbConnection';


interface configType{
  dbName:string,
  frontendUrl:string,
  servicePort:number,
  routes?:Router[]
}

export async function startServer(config:configType){

  const app :Application= express();
  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(cors({
     origin:[config.frontendUrl || ""],
     credentials:true
  }));


  const connection = await setDatabaseConnection(config.dbName || "");
  if(!connection.status){
    process.exit(1);
  }

  app.listen(config.servicePort, ()=>{
    console.log("Server Listening");
  })

  config.routes?.forEach((route)=>{
    app.use(route);
  })

}

export default startServer;

