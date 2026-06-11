import startServer from "../shared/service/serviceStarter";
import "dotenv/config";
import routes from "./Routes/routes";

startServer({
    dbName:String(process.env.MAILER_SERVICE_DATABASE_NAME), 
    frontendUrl:String(process.env.FRONTEND_LINK_STRING),
    servicePort:Number(process.env.MAILER_SERVICE_PORT), 
    routes:[routes]
}).then(()=>{
   console.log("Mailer Service Started");
}).catch((err)=>{
   console.log(err);
});

