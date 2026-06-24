import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";
import bcrypt from "bcrypt"


export async function otpVerification(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
  }
  try{
     const {otp} = request.body;
     const {authCookie} = request.cookies;
     if(!authCookie){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad); 
     }
     const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
     const authDetails = await authUserModel.findOne({_id:jwtString?.auth_Id});
     if(!authDetails){  
       responsePayLoad.status=false;
       responsePayLoad.code="USER_NOT_FOUND";
       responsePayLoad.body="User Not Found";
       return response.status(404).json(responsePayLoad);
     }
     const otpValid = await bcrypt.compare(otp+process.env.SECRETKEY, authDetails?.otp || "");
     if(!otpValid){
       responsePayLoad.status=false;
       responsePayLoad.code="INVALID_OTP";
       responsePayLoad.body="Invalid Otp";
       return response.status(401).json(responsePayLoad);
     }
     if(otp != otpValid){
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
  catch(err){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";
     return response.status(500).json(responsePayLoad);
  }
}