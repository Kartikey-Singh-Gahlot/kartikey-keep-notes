import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response, NextFunction } from "express";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";




export async function serviceInternalCommunicationFirewall(request:extendedRequest, response:Response, next:NextFunction){
   const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{
     const xinternalServiceSecret = request.headers["x-internal-service-secret"];
     if(xinternalServiceSecret != process.env.INTERNAL_SERVICE_SECRET || !xinternalServiceSecret){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad);
     }
     return next();
   }
   catch(err:any){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";  
     responsePayLoad.body={message: "Internal Server Error", error: err.message};
     return response.status(500).json(responsePayLoad);
   }
}