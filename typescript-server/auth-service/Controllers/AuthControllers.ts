import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";

import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"
import { userValiditityInterface, userDetailsInterface } from "../../shared/interfaces/utilInterfaces";


// export async function authController(request:Request, response:Response):Promise<Response>{
//   const responsePayLoad:ResponseEntity<string>={
//     status:true,
//     code:"",
//     body:"",
//   }
//    try{
//        responsePayLoad.code="SERVICE_REACHABLE";
//        responsePayLoad.body="Auth Service Reachable :)";
//        return response.status(200).json(responsePayLoad);

//    }
//    catch(err){
//       responsePayLoad.code="INTERNAL_SERVER_ERROR",
//       responsePayLoad.body="Auth Service Not Reachable !"
//       return response.status(500).json()
//    }  
// }


export async function createGuest(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<Object>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const { lightTheme } = request.body;
    const themeToken = jwt.sign({lightTheme}, process.env.SECRETKEY || '', {expiresIn:"7d"});
    response.cookie("guestCookie", themeToken, cookieDetails);
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


export async function checkAuth(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
  }
  try{
   console.log("working")
   responsePayLoad.status=false;
   responsePayLoad.code="INTERNAL_SERVER_ERROR";
   responsePayLoad.body={message: "Internal Server Error"};
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
    const {authCookie}= request.cookies;
    if(!authCookie){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad);
    }
    const validJwt : userValiditityInterface = jwt.verify(authCookie,process.env.SECRETKEY || '') as userValiditityInterface;

    if(!validJwt){
       responsePayLoad.status=false;
       responsePayLoad.code="UNAUTHORIZED_ACESS";
       responsePayLoad.body="Unauthorized Acess";
       return response.status(401).json(responsePayLoad);
    }
    const userExist: Object | null = await authUserModel.findById(validJwt._id || '');
    if(!userExist){
      responsePayLoad.status=false;
      responsePayLoad.code="USER_NOT_FOUND";
      responsePayLoad.body="User Not Found";
      return response.status(404).json(responsePayLoad);
    }
    const userQuery= await fetch(`${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internal-service-secret":process.env.INTERNAL_SERVICE_SECRET || "" }});
    const userDetails= await userQuery.json();
    responsePayLoad.status=true;
    responsePayLoad.code="USER_FOUND";
    responsePayLoad.body=userDetails.body;
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
     const {name, email, password} = request.body;
     const userExists : Object | null = await authUserModel.findOne({email});
     if(userExists){
        responsePayLoad.status=false;
        responsePayLoad.code="USER_ALREADY_EXISTS";
        responsePayLoad.body="User Already Exists";
        return response.status(409).json(responsePayLoad);
     }
     const salt1 = await bcrypt.genSalt(10);
     const hashedPassword1 = await bcrypt.hash(password, salt1);
     const salt2 = await bcrypt.genSalt(10);
     const hashedPassword2 = await bcrypt.hash(hashedPassword1, salt2);
     const authDbEntry = await authUserModel.create({email, password:hashedPassword2, salt:salt1});
     const userQuery = await fetch(`${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal-service-secret":process.env.INTERNAL_SERVICE_SECRET || "" },body:JSON.stringify({authId:authDbEntry._id,name:name})}); 
     const userDetails = await userQuery.json();
     const jwtString = jwt.sign({_id:authDbEntry._id}, process.env.SECRETKEY || '', {expiresIn:"7d"}); 
     response.cookie("authCookie", jwtString , cookieDetails);

     responsePayLoad.status=true;
     responsePayLoad.code="SINGUP_SUCCESSFULL";
     responsePayLoad.body={
      email:authDbEntry?.email,
      name:userDetails.body?.name
     };
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

