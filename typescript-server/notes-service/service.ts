import startServer from "../shared/service/serviceStarter";
import "dotenv/config";


startServer({
    dbName:String(process.env.NOTES_SERVICE_DATABASE_NAME), 
    frontendUrl:String(process.env.FRONTEND_LINK_STRING),
    servicePort:Number(process.env.NOTES_SERVICE_PORT), 
    routes:[]

}).then(()=>{
   console.log("Auth server Started");
}).catch((err)=>{
   console.log(err);
});

