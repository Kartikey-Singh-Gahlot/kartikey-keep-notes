import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response, NextFunction } from "express";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";


// export async function getTemplateMiddleWares(request:extendedRequest, response:Response, next:NextFunction){
//    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
//    try{
     
//    }
//    catch(err:any){
//      responsePayLoad.status=false;
//      responsePayLoad.code="INTERNAL_SERVER_ERROR";  
//      responsePayLoad.body={message: "Internal Server Error", error: err.message};
//      return response.status(500).json(responsePayLoad);
//    }
// }

