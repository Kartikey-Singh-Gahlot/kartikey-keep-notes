import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import { Response, NextFunction} from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface";



export async function createUserFirewall(request:extendedRequest, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const xinternalServiceSecret = request.headers["x-internal-service-secret"];
    if(xinternalServiceSecret != process.env.INTERNAL_SERVICE_SECRET){
      responsePayLoad.status=false;
      responsePayLoad.code="UNAUTHORIZED_ACESS";
      responsePayLoad.body="Unauthorized Acess";
      return response.status(401).json(responsePayLoad);
    }
    const {authId, firstName, middleName, lastName, lightTheme} = request.body;
    if(!authId || !firstName || !lastName){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_CREDENTIALS";
      responsePayLoad.body="Invalid Credentials";
      return response.status(400).json(responsePayLoad);
    }
    request.authData={
      authId:authId,
      firstName:firstName,
      middleName:middleName,
      lastName:lastName,
      lightTheme:lightTheme,
    }
    console.log("pass")
    return next();
  }
  catch(err:any){
   responsePayLoad.status=false;
   responsePayLoad.code="INTERNAL_SERVER_ERROR";
   responsePayLoad.body={message: "Internal Server Error", error: err.message};
   return response.status(500).json(responsePayLoad);
  }
}

export async function getUserFirewall(request:extendedRequest, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {authId} = request.query;
    if(!authId){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_CREDENTIALS";
      responsePayLoad.body="Invalid Credentials";
      return response.status(400).json(responsePayLoad);
    }
    request.authData={
      authId:String(authId)
    }
    return next();
  }
  catch(err:any){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err.message}
  }
}