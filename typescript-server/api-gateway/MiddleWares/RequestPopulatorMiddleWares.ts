import  {Request,Response, NextFunction} from 'express';
import ResponseEntity from '../../shared/interfaces/responseEntityInterface';



export function RequestPopulatorMiddleWare(serviceApiUrl?: string){
   return (request:Request, response:Response, next:NextFunction)=>{
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{
       request.headers["x-internal-service-secret"] = process.env.INTERNAL_SEVICE_SECRET as string;
       request.headers["x-service-api-url"] = serviceApiUrl as string;
       return next();
    }
    catch(err:any){
       responsePayLoad.status=false;
       responsePayLoad.code="INTERNAL_SERVER_ERROR";
       responsePayLoad.body={message: "Internal Server Error", error: err.message};
       return response.status(500).json(responsePayLoad);
    }
   }
}