import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";


export async function authService(request:Request, response:Response):Promise<Response>{
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