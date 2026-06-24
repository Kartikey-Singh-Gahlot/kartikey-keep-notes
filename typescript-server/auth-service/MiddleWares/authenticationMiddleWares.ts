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
    request.hybridAuthData = {
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

export async function signupValidationFirewall(request:extendedRequest, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {firstName, middleName, lastName, email, password} = request.body;
    if(!firstName || !lastName || !email || !password){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_CREDENTIALS";
      responsePayLoad.body="Invalid Credentials";
      return response.status(400).json(responsePayLoad);
    }
    const userExists : Object | null = await authUserModel.findOne({email});
    if(userExists){
        responsePayLoad.status=false;
        responsePayLoad.code="USER_ALREADY_EXISTS";
        responsePayLoad.body="User Already Exists";
        return response.status(409).json(responsePayLoad);
    }
    request.signupAuthData ={
      firstName:String(firstName),
      middleName:String(middleName),
      lastName:String(lastName),
      email:String(email),
      password:String(password)
    }
    return next();
  }
  catch(err){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err};
    return response.status(500).json(responsePayLoad);
  }
}

export async function loginValidationFirewall(request:extendedRequest, response:Response, next:NextFunction){
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {email, password} = request.body;
    if(!email || !password){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_CREDENTIALS";
      return response.status(400).json(responsePayLoad);
    }
    const authDetails = await authUserModel.findOne({email});
     if(!authDetails){
       responsePayLoad.status=false;
       responsePayLoad.code="USER_NOT_FOUND";
       responsePayLoad.body="User Not Found";
       return response.status(404).json(responsePayLoad);
    }
    if((authDetails?.isVerified==false) || (authDetails?.isVerified && authDetails?.otp==null) ){
           responsePayLoad.status=false;
           responsePayLoad.code="OTP_VERIFICATION_PENDING";
           responsePayLoad.body="Otp Verification Pending";
           return response.status(401).json(responsePayLoad);
    }
    request.loginAuthData = {
      authId:String(authDetails?._id),
      email:String(email),
      password:String(password), 
    }
    return next();
  }
  catch(err){
responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err};
    return response.status(500).json(responsePayLoad);
  }
}


