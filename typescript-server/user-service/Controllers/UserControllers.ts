import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import userModel from "../Models/userModel"; 
import { ObjectEncodingOptions } from "node:fs";


export async function createUser(request:extendedRequest, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<Object>={
    status:false,
    code:"",
    body:"",
  }
  if(!request.hybridAuthData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_USER";  
    return response.status(401).json(responsePayLoad);
  }
   try{
     const {authId, firstName, middleName, lastName, lightTheme} = request.hybridAuthData;
     const userExists = await userModel.findOne({authId});
     if(userExists){
        responsePayLoad.status=false;
        responsePayLoad.code="USER_ALREADY_EXISTS";
        responsePayLoad.body="User Already Exists";
        return response.status(409).json(responsePayLoad);
    }
    await userModel.create({
       authId:authId,
       firstName:firstName,
       middleName:middleName,
       lastName:lastName,
       lightTheme:lightTheme,
    });
    responsePayLoad.status=true;
    responsePayLoad.code="USER_CREATED";
    responsePayLoad.body="User Created";
    return response.status(201).json(responsePayLoad);
   }
   catch(err:any){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";
     responsePayLoad.body={message: "Internal Server Error", error: err.message};
     return response.status(500).json(responsePayLoad);
   }
}


export async function getUser(request:extendedRequest, response:Response):Promise<Response> {
  const responsePayLoad:ResponseEntity<Object>={
    status:false,
    code:"",
    body:"",
  }
  try{
    
  }
  catch(err:any){

  }
}

