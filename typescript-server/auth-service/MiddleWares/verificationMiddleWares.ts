import express, {Request, Response, NextFunction} from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import jwt, {JwtPayload }  from "jsonwebtoken";
import authUserModel from "../Models/authUserModel";



export async function verificationFirewall(request:extendedRequest, response:Response, next:NextFunction){
   const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:"",
   }
   try{
      
   }
   catch(err){

   }
}