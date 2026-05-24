import startServer from "../shared/service/serviceStarter";
import "dotenv/config";
import routes from "./Routes/routes";


startServer({
    dbName:String(process.env.AUTH_SERVICE_DATABASE_NAME), 
    frontendUrl:String(process.env.FRONTEND_LINK_STRING),
    servicePort:Number(process.env.AUTH_SERVICE_PORT), 
    routes:[routes]
}).then(()=>{
   console.log("Auth Service Started");
}).catch((err)=>{
   console.log(err);
});

