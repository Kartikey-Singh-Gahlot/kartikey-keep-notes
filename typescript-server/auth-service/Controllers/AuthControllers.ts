import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"


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
  catch(err:any){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err.message};
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
  if(!request.authData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_USER";
    responsePayLoad.body="Invalid User";
    return response.status(401).json(responsePayLoad);
  }
  try{
    const {authId, isAdmin, isVerified} = request.authData;
    const userQuery= await fetch(`${process.env.PUBLIC_API_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internalServiceSecret":process.env.INTERNAL_SERVICE_SECRET || ""}, body:JSON.stringify({
      authId:authId
    })});
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
      isAdmin:isAdmin,
      isVerified:isVerified,
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
  catch(err:any){ 
   responsePayLoad.status=false;
   responsePayLoad.code="INTERNAL_SERVER_ERROR";
   responsePayLoad.body={message: "Internal Server Error", error: err.message};
   return response.status(500).json(responsePayLoad);
  }
}

export async function login(request:extendedRequest, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
  }
  if(!request.authData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_CREDENTIALS";
    responsePayLoad.body="Invalid Credentials";
    return response.status(400).json(responsePayLoad);
  }
  try{
    const userEnteredPassoword = request.authData.password;
    const {authId, password} = request.authData;
    const {guestCookie} = request.cookies;
    const passwordValid = await  bcrypt.compare(password + (process.env.SECRETKEY|| ""),String(userEnteredPassoword));
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
      authId:authId
    }, process.env.SECRETKEY || '', {expiresIn:"7d"}); 

    response.cookie("authCookie",jwtString,cookieDetails);
    responsePayLoad.status=true;
    responsePayLoad.code="LOGIN_SUCCESSFULLY";
    responsePayLoad.body="Login Successfully";
    return response.status(200).json(responsePayLoad);
  }
  catch(err:any){
     responsePayLoad.status=false;
     responsePayLoad.code="INTERNAL_SERVER_ERROR";
     responsePayLoad.body={message: "Internal Server Error", error: err.message};
     return response.status(500).json(responsePayLoad);
  }
}

export async function signup(request:extendedRequest, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
   }
   if(!request.authData){
    responsePayLoad.status=false;
    responsePayLoad.code="INVALID_CREDENTIALS";
    responsePayLoad.body="Invalid Credentials";
    return response.status(400).json(responsePayLoad);
   }
   try{
     let currentTheme = true; // default theme
     const {firstName, middleName, lastName, email, password} = request.authData;
     const {guestCookie} = request.cookies;
     if(guestCookie && guestCookie.lightTheme==false){
         currentTheme = false;
         response.clearCookie("guestCookie");
     }  
     
     const salt1 = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password+ (process.env.SECRETKEY || ''), salt1);
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
     const userQuery = await fetch(`${process.env.PUBLIC_API_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.INTERNAL_SERVICE_SECRET || "" },body:JSON.stringify({
       authId:authDbEntry._id,
       firstName:firstName,
       middleName:middleName,
       lastName:lastName,
       lightTheme:currentTheme
     })});
     const userResponse = await userQuery.json();
     if(!userResponse.status){
       console.log(userResponse.body);
       await authUserModel.deleteOne({_id:authDbEntry._id});
       responsePayLoad.status=false;
       responsePayLoad.code="USER_SERVICE_ERROR";
       responsePayLoad.body=`USER_SERVICE_ERROR : ${userResponse.body}`;
       return response.status(500).json(responsePayLoad);
     }
     const jwtString = jwt.sign({
        authId:authDbEntry._id
      }, process.env.SECRETKEY || '', {expiresIn:"7d"}); 

     response.cookie("authCookie", jwtString , cookieDetails);
     const getTemplateQuery = await fetch(`${process.env.PUBLIC_API_URL}:${process.env.MAILER_SERVICE_PORT}/mailer/template?templateName=signupOtpVerificationMailTemplate`,{ method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.INTERNAL_SERVICE_SECRET || "" }});
     const signupOtpVerificationMailTemplate = await getTemplateQuery.json();
     
     if(!signupOtpVerificationMailTemplate.status){
       responsePayLoad.status=false;
       responsePayLoad.code="TEMPLATE_SERVICE_ERROR"; 
       responsePayLoad.body=`TEMPLATE_SERVICE_ERROR : ${signupOtpVerificationMailTemplate.body}`;
       return response.status(500).json(responsePayLoad);
     }
     const mailerQuery = await fetch(`${process.env.PUBLIC_API_URL}:${process.env.MAILER_SERVICE_PORT}/mailer/sendMail`,{ method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.INTERNAL_SERVICE_SECRET || "" },body:JSON.stringify({
        to:email,
        subject:signupOtpVerificationMailTemplate.body.subject,
        msg:signupOtpVerificationMailTemplate.body.templateBody.replace("{{otp}}",otp)
     })});
     const mailerResponse = await mailerQuery.json();
     if(!mailerResponse.status){  
       responsePayLoad.status=false;
       responsePayLoad.code="MAILER_SERVICE_ERROR"; 
       responsePayLoad.body=`MAILER_SERVICE_ERROR : ${mailerResponse.body}`;
       return response.status(500).json(responsePayLoad);
     }
     responsePayLoad.status=true;
     responsePayLoad.code="OTP_VERIFICATION_REQUIRED";
     responsePayLoad.body=`An OTP has been sent to ${email}. Please verify your email.`;
     return response.status(201).json(responsePayLoad);
   }
   catch(err:any){
    responsePayLoad.status=false;
    responsePayLoad.code="INTERNAL_SERVER_ERROR";
    responsePayLoad.body={message: "Internal Server Error", error: err.message};
    return response.status(500).json(responsePayLoad);
   }
}
