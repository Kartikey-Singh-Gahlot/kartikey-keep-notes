import startServer from "../utils/shared/service/serviceStarter";
import "dotenv/config";


startServer({
    dbUrl:String(process.env.MONGO_DB_CONNECTION_STRING), 
    frontendUrl:String(process.env.FRONTEND_LINK_STRING),
    servicePort:Number(process.env.AUTH_SERVER_PORT), 
}).then(()=>{
   console.log("Auth server Started");
}).catch((err)=>{
   console.log(err);
});

