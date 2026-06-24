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
  if(!request.authData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_USER";  
    return response.status(401).json(responsePayLoad);
  }
   try{
     const {authId, firstName, middleName, lastName, lightTheme} = request.authData;
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
  if(!request.authData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_USER";
    return response.status(401).json(responsePayLoad);
  }
  try{
    const {authId} = request.authData;
    const userDetails = await userModel.findOne({authId});
    if(!userDetails){
      responsePayLoad.status=false;
      responsePayLoad.code="USER_NOT_FOUND";
      responsePayLoad.body="User Not Found";
      return response.status(404).json(responsePayLoad);
    }
    responsePayLoad.status=true;
    responsePayLoad.code="USER_FOUND";
    responsePayLoad.body={
       firstName:userDetails.firstName,
       middleName:userDetails.middleName,
       lastName:userDetails.lastName,
       imageUrl:userDetails.imageUrl,
       roadmaps:userDetails.roadmaps,
       completedSubjects:userDetails.completedSubjects,
       completedChapters:userDetails.completedChapters,
       completedSections:userDetails.completedSections,
       likedSubjects:userDetails.likedSubjects,
       lightTheme:userDetails.lightTheme,
       createdAt:userDetails.createdAt
    }
    return response.status(200).json(responsePayLoad);
  }
  catch(err:any){
   responsePayLoad.status=false;
   responsePayLoad.code="INTERNAL_SERVER_ERROR";
   responsePayLoad.body={message: "Internal Server Error", error: err.message};
   return response.status(500).json(responsePayLoad);
  }
}
