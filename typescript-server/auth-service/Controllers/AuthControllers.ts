import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"
import { userValiditityInterface, userDetailsInterface } from "../../shared/interfaces/utilInterfaces";


export async function getGuest(request:extendedRequest, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
     const {themeData} = request;
     responsePayLoad.status=true;
     responsePayLoad.code="GUEST_FOUND";
     responsePayLoad.body={lightTheme:themeData?.lightTheme};
     return response.status(200).json(responsePayLoad);
  }
  catch(err){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body=`Internal Server Error : ${err}`;
    return response.status(500).json(responsePayLoad);
  
  }
}

export async function createGuest(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const { lightTheme } = request.body;
    response.cookie("guestCookie", {lightTheme:lightTheme}, cookieDetails);
    responsePayLoad.code="THEME_PREFERENCE_SAVED";
    responsePayLoad.body="Theme Preference Saved";
    return response.status(201).json(responsePayLoad);
  }
  catch(err){
    responsePayLoad.code="SERVER_SIDE_ERROR";
    responsePayLoad.body="Internal Server Error";
    return response.status(500).json(responsePayLoad);
  }
}

export async function checkAuth(request:extendedRequest, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {authData} = request;
    const userQuery= await fetch(`${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internal-service-secret":process.env.INTERNAL_SERVICE_SECRET || "" }});
    const userDetails = await userQuery.json();
    if(!userDetails.status){
      responsePayLoad.status=false;
      responsePayLoad.code="USER_SERVICE_ERROR";
      responsePayLoad.body=`USER_SERVICE_ERROR : ${userDetails.body}`;
      return response.status(500).json(responsePayLoad);
    }
    responsePayLoad.status=true;
    responsePayLoad.code="AUTH_SUCCESSFULL";
    responsePayLoad.body={
      isAdmin:authData?.isAdmin,
      isVerified:authData?.isVerified,
      firstName:userDetails.body?.firstName,
      middleName:userDetails.body?.firstName,
      lastName:userDetails.body?.firstName,
      imageUrl:userDetails.body?.imageUrl,
      roadmaps:userDetails.body?.roadmaps,
      completedSubjects:userDetails.body?.completedSubjects,
      completedChapters:userDetails.body?.completedChapters,
      completedSections:userDetails.body?.completedSections,
      likedSubjects:userDetails.body?.likedSubjects,
      lightTheme:userDetails.body?.lightTheme,
      createdAt:userDetails.body?.createdAt
    };
    return response.status(200).json(responsePayLoad);
  } 
  catch(err){ 
   responsePayLoad.status=false;
   responsePayLoad.code="INTERNAL_SERVER_ERROR";
   responsePayLoad.body={message: "Internal Server Error", error: err};
   return response.status(500).json(responsePayLoad);
  }
}

export async function login(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const {email, password} = request.body;
    const {guestCookie} = request.cookies;
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
    const passwordValid = await  bcrypt.compare(password + process.env.SECRETKEY, authDetails?.password || "");
    if(!passwordValid){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_PASSWORD";
      responsePayLoad.body="Invalid Password";
      return response.status(401).json(responsePayLoad);
    }

    if(guestCookie){
      response.clearCookie("guestCookie");
    }

    const jwtString = jwt.sign({
      auth_Id:authDetails._id
    }, process.env.SECRETKEY || '', {expiresIn:"7d"}); 

    response.cookie("authCookie",jwtString,cookieDetails);
    responsePayLoad.status=true;
    responsePayLoad.code="LOGIN_SUCCESSFULLY";
    responsePayLoad.body="Login Successfully";
    return response.status(200).json(responsePayLoad);
  }
  catch(err){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";
     responsePayLoad.body={message: "Internal Server Error", error: err};
     return response.status(500).json(responsePayLoad);
  }
}

export async function signup(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
   }
   try{
     let currentTheme = true;
     const {firstName, middleName, lastName, email, password} = request.body;
     const {guestCookie} = request.cookies;
     if(guestCookie && guestCookie.lightTheme==false){
         currentTheme = false;
         response.clearCookie("guestCookie");
     }  
     const userExists : Object | null = await authUserModel.findOne({email});
     if(userExists){
        responsePayLoad.status=false;
        responsePayLoad.code="USER_ALREADY_EXISTS";
        responsePayLoad.body="User Already Exists";
        return response.status(409).json(responsePayLoad);
     }
     const salt1 = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password+process.env.SECRETKEY, salt1);
     const otp = Math.floor(1000 + Math.random() * 9000).toString();
     const salt2 = await bcrypt.genSalt();
     const hashedOtp = await bcrypt.hash(otp+process.env.SECRETKEY, salt2);
     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
     const authDbEntry = await authUserModel.create({
      email:email, 
      password:hashedPassword, 
      otp:hashedOtp,
      otpExpiry:otpExpiry
     });
     const userQuery = await fetch(`${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal-service-secret":process.env.INTERNAL_SERVICE_SECRET || "" },body:JSON.stringify({
       authId:authDbEntry._id,
       firstName:firstName,
       middleName:middleName,
       lastName:lastName,
       lightTheme:currentTheme
     })}); 
     const jwtString = jwt.sign({
        auth_Id:authDbEntry._id
      }, process.env.SECRETKEY || '', {expiresIn:"7d"}); 

     response.cookie("authCookie", jwtString , cookieDetails);
     responsePayLoad.status=true;
     responsePayLoad.code="SINGUP_SUCCESSFULL";
     responsePayLoad.body="Signup Successfull";
     return response.status(201).json(responsePayLoad);
   }
   catch(err){
    console.log(err);
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body="Internal Server Error";
    return response.status(500).json(responsePayLoad);
   }
}

