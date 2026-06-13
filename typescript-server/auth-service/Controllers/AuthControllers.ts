import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";

import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"
import { userValiditityInterface, userDetailsInterface } from "../../shared/interfaces/utilInterfaces";


export async function authController(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<string>={
    status:true,
    code:"",
    body:"",
  }
   try{
       responsePayLoad.code="SERVICE_REACHABLE";
       responsePayLoad.body="Auth Service Reachable :)";
       return response.status(200).json(responsePayLoad);

   }
   catch(err){
      responsePayLoad.code="INTERNAL_SERVER_ERROR",
      responsePayLoad.body="Auth Service Not Reachable !"
      return response.status(500).json()
   }  
}

export async function getUser(request:Request, response:Response):Promise<Response>{
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
    const userQuery= await fetch(`${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}/user`,{ method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } });
    const userDetails= await userQuery.json();
    console.log(userDetails);
    responsePayLoad.status=true;
    responsePayLoad.code="USER_FOUND";
    responsePayLoad.body=userDetails.body;
    return response.status(200).json(responsePayLoad);

  }
  catch(err){
   console.log(err);
  }
  return response.status(200).json(responsePayLoad);
}

