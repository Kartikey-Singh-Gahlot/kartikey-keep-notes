import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import  jwt, {type JwtPayload}  from "jsonwebtoken";
import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"


export async function guestController(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<string>={
    status:true,
    code:"",
    body:"",
  }
   try{
       responsePayLoad.code="SERVICE_REACHABLE";
       responsePayLoad.body="Guest Controllers Reachable :)";
       return response.status(200).json(responsePayLoad);

   }
   catch(err){
      responsePayLoad.code="INTERNAL_SERVER_ERROR",
      responsePayLoad.body="Guest Controllers  Not Reachable !"
      return response.status(500).json()
   }  
}

export async function createGuest(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<string>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const { lightTheme } = request.body;
    const themeToken = jwt.sign({lightTheme}, process.env.SECRETKEY || '', {expiresIn:"7d"});
    response.cookie("themeCookie", themeToken, cookieDetails);
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

export async function getGuest(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<{}>={
    status:true,
    code:"",
    body:true,
  }
  console.log("working");
   try{
      const {themeCookie}=request.cookies;
      let currentTheme = true;
      if(themeCookie){
        try{
          const validTheme=jwt.verify(themeCookie,process.env.SECRETKEY || '') as JwtPayload;
          if(!validTheme.lightTheme){
            currentTheme = false;
          }
        } 
        catch(err){
          console.log(err);
        }
      }
       responsePayLoad.code="THEME_PREFERENCE_SAVED";
       responsePayLoad.body={lightTheme:currentTheme};
       return response.status(200).json(responsePayLoad);

   }
   catch(err){
      responsePayLoad.code="INTERNAL_SERVER_ERROR",
      responsePayLoad.body=false;
      return response.status(500).json(responsePayLoad);
   }
   
}


