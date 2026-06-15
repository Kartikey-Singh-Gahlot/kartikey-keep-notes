import express, {Request, Response, NextFunction} from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";



export async function authFirewall(request:Request, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {authCookie, guestCookie} =  request.cookies;
    if(guestCookie){
      const jwtString = jwt.verify(guestCookie, process.env.SECRETKEY || '') as JwtPayload;
      if(!jwtString){
        responsePayLoad.status=false;
        responsePayLoad.code="INVALID_GUEST";
        responsePayLoad.body="Invalid Guest";
        return response.status(401).json(responsePayLoad);
      }
      const currentTheme = jwtString.lightTheme;
      responsePayLoad.status=true;
      responsePayLoad.code="GUEST_FOUND";
      responsePayLoad.body={
        lightTheme:currentTheme
      };
      return response.status(200).json(responsePayLoad); 
    }
    if(!authCookie){
      responsePayLoad.status=false;
      responsePayLoad.code="UNAUTHORIZED_ACESS";
      responsePayLoad.body="Unauthorized Acess";
      return response.status(401).json(responsePayLoad);
    }
    const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    if(!jwtString){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_USER";
      responsePayLoad.body="Invalid User";
      return response.status(401).json(responsePayLoad);
    } 
    const userExist = await authUserModel.findById(jwtString._id || '');
    if(!userExist){   
      responsePayLoad.status=false;
      responsePayLoad.code="USER_NOT_FOUND";
      responsePayLoad.body="User Not Found";
      return response.status(404).json(responsePayLoad);
    }
    request.body.data = {authId:jwtString?._id};
    return next();
  }
  catch(err){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err};
    return response.status(500).json(responsePayLoad);
  }
}