import express, {Request, Response, NextFunction} from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";






export async function themeFirewall(request:extendedRequest, response:Response, next:NextFunction){
    const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {guestCookie} =  request.cookies;
    if(!guestCookie){
      responsePayLoad.status=false;
      responsePayLoad.code="UNAUTHORIZED_ACESS";
      responsePayLoad.body="Uauthorized Access";
      return response.status(401).json(responsePayLoad);
    }
    request.themeData = {lightTheme:guestCookie.lightTheme};
    return next();
  }
  catch(err){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body=`Internal Server Error : ${err}`;
    console.log(err);
    return response.status(500).json(responsePayLoad);
  }
}


export async function authFirewall(request:extendedRequest, response:Response, next:NextFunction){
   const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {authCookie} =  request.cookies;
    if(!authCookie){
      responsePayLoad.status=false;
      responsePayLoad.code="UNAUTHORIZED_ACESS";
      responsePayLoad.body="Unauthorized Acess";
      return response.status(401).json(responsePayLoad);
    }
    const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    const authUserDetails = await authUserModel.findById(jwtString?.authId);

    if(!jwtString){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_USER";
      responsePayLoad.body="Invalid User";
      return response.status(401).json(responsePayLoad);
    } 
    request.authData = {
      authId:String(authUserDetails?._id),
      isAdmin:Boolean(authUserDetails?.isAdmin), 
      isVerified:Boolean(authUserDetails?.isVerified),
      otp:String(authUserDetails?.otp) || null,
      otpExpiry:authUserDetails?.otpExpiry || null,
      password:String(authUserDetails?.password) || null,
    };
    return next();
  }
  catch(err){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err};
    return response.status(500).json(responsePayLoad);
  }
}

