import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import jwt, {JwtPayload }  from "jsonwebtoken";
import express, {Request, Response, NextFunction} from "express";



export async function sendMailFirewall(request:extendedRequest, response:Response, next:NextFunction){
   const responsePayLoad:ResponseEntity<{}>= new ResponseEntity(true, "", {});
   try{
     const {internal_service_secret} = request.headers;
     if(internal_service_secret != process.env.INTERNAL_SERVICE_SECRET){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad);
     }
     const {to, sub, msg} = request.body;
     if(!to || !sub || !msg){
       responsePayLoad.status=false;
       responsePayLoad.code="INVALID_DATA";
       responsePayLoad.body="Invalid Data";
       return response.status(401).json(responsePayLoad);
     }
     request.mailData={
       to:to,
       sub:sub,
       msg:msg
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