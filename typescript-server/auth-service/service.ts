import startServer from "../shared/service/serviceStarter";
import "dotenv/config";


startServer({
    dbName:String(process.env.AUTH_SERVICE_DATABASE_NAME), 
    frontendUrl:String(process.env.FRONTEND_LINK_STRING),
    servicePort:Number(process.env.AUTH_SERVICE_PORT), 
}).then(()=>{
   console.log("Auth Service Started");
}).catch((err)=>{
   console.log(err);
});

