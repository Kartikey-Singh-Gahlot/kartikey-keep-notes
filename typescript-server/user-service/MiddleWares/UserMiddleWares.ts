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
    const {internal_service_secret} = request.headers;
    if(internal_service_secret != process.env.INTERNAL_SERVICE_SECRET){
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
    request.hybridAuthData={
      authId:authId,
      firstName:firstName,
      middleName:middleName,
      lastName:lastName,
      lightTheme:lightTheme,
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