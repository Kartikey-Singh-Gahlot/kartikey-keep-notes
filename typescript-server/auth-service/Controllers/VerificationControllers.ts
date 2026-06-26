import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/AuthUserModel.js";
import bcrypt from "bcrypt"
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";


export async function otpVerification(request:extendedRequest, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
  if(!request.otpAuthData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_CREDENTIALS";
    responsePayLoad.body="Invalid Credentials";
    return response.status(400).json(responsePayLoad);
  }
  try{
     const {otp} = request.otpAuthData;
     const {authCookie} = request.cookies;
     if(!authCookie){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad); 
     }
     const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
     const authDetails = await authUserModel.findOne({_id:jwtString?.authId});
     if(!authDetails){  
       responsePayLoad.status=false;
       responsePayLoad.code="USER_NOT_FOUND";
       responsePayLoad.body="User Not Found";
       return response.status(404).json(responsePayLoad);
     }
     const otpValid = await bcrypt.compare(otp+(process.env.SECRETKEY || ""), String(authDetails?.otp));
     if(!otpValid){
       responsePayLoad.status=false;
       responsePayLoad.code="INVALID_OTP";
       responsePayLoad.body="Invalid Otp";
       return response.status(401).json(responsePayLoad);
     }
     if(!otpValid){
        responsePayLoad.status=false;
        responsePayLoad.code="OTP_VERIFICATION_FAILED";
        responsePayLoad.body="Otp Verification Failed";
        return response.status(401).json(responsePayLoad);
     }
     responsePayLoad.status=true;
     responsePayLoad.code="OTP_VERIFICATION_SUCCESSFULL";
     responsePayLoad.body="Otp Verification Successfull";
     return response.status(200).json(responsePayLoad);

  }
  catch(err:any){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";
     responsePayLoad.body={message: "Internal Server Error", error: err.message};
     return response.status(500).json(responsePayLoad);
  }
}