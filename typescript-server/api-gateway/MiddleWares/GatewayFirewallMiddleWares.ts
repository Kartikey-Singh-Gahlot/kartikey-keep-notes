import {Request,Response, NextFunction} from 'express';
import ResponseEntity from '../../shared/interfaces/responseEntityInterface';
import jwt, {JwtPayload }  from "jsonwebtoken";
import { extendedRequest } from '../../shared/interfaces/middleWareInterfaces';

export async function LoggedInFirewall(request:extendedRequest, response:Response, next:NextFunction){
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{
       const {authCookie} = request.cookies;
       if(!authCookie){
          responsePayLoad.status=false;
          responsePayLoad.code="UNAUTHORIZED_ACESS";
          responsePayLoad.body="Denied Acess";
          return response.status(401).json(responsePayLoad);
        }
        const jwtString = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
        if(!jwtString){
           responsePayLoad.status=false;
           responsePayLoad.code="INVALID_USER";
           responsePayLoad.body="Invalid Request Found Denied Access";
           return response.status(401).json(responsePayLoad);
        }
        request.headers["x-auth-id"] = String(jwtString.authId);
        return next();
        
    }
    catch(err:any){
       responsePayLoad.status=false;
       responsePayLoad.code="INTERNAL_SERVER_ERROR";
       responsePayLoad.body={message: "Internal Server Error", error: err.message};
       return response.status(500).json(responsePayLoad);
    }
}