import startServer from "../shared/service/serviceStarter";
import "dotenv/config";
import routes from "./Routes/Routes";



startServer({
    allowedOrigins:[String(process.env.FRONTEND_LINK_STRING)],
    servicePort:Number(process.env.API_GATEWAY_SERVICE_PORT), 
    routes:[routes]
}).then(()=>{
   console.log("API Gateway Started");
}).catch((err)=>{
   console.log(err);
});
