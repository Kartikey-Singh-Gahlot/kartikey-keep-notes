import express, {Request, Response, NextFunction} from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";




export async function otpValidationFirewall(request:extendedRequest, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
   const {otp} = request.body;
   const {authCookie} = request.cookies;
   if(!otp || otp.length!=4){
     responsePayLoad.status=false;
     responsePayLoad.code="INVALID_OTP";
     responsePayLoad.body="Invalid Otp";
     return response.status(400).json(responsePayLoad);
   }
   const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
   const authDetails = await authUserModel.findOne({_id:jwtString?.authId});
   if(!authDetails){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_USER";
      responsePayLoad.body="Invalid User"
      return response.status(401).json(responsePayLoad);
   }
   if(new Date(authDetails?.otpExpiry || "") <new Date()){
      responsePayLoad.status=false;
      responsePayLoad.code="OTP_EXPIRED";
      responsePayLoad.body="Otp Expired";
      return response.status(401).json(responsePayLoad);
   }
   request.otpAuthData={
     otp:otp,
   }
   return next();
  }
  catch(err:any){
    console.log(err);
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err.message};
    return response.status(500).json(responsePayLoad);
  }
}