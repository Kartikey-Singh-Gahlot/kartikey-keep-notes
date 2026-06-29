import { Request, Response } from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface"
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";




export async function getRequestProxyController(request:extendedRequest, response:Response) {
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{
       const query = await fetch(`${request.headers["x-service-api-url"]}`,{ method: "GET", credentials: "include", headers: request.headers as HeadersInit});
       const respondedData = await query.json();
       if(!respondedData.status){
          responsePayLoad.status=false;
          responsePayLoad.code=respondedData.code;
          responsePayLoad.body=respondedData.body;
          return response.status(400).json(responsePayLoad);
       }
       responsePayLoad.status=true;
       responsePayLoad.code=respondedData.code;
       responsePayLoad.body=respondedData.body;
       return response.status(200).json(responsePayLoad);
    }
    catch(err:any){
       responsePayLoad.status=false;
       responsePayLoad.code="INTERNAL_SERVER_ERROR";
       responsePayLoad.body={message: "Internal Server Error", error: err.message};
       return response.status(500).json(responsePayLoad);
    }
}

export async function postRequestProxyController(request:Request, response:Response) {
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{
     
    }
    catch(err){

    }
}

export async function putRequestProxyController(request:Request, response:Response) {
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{

    }
    catch(err){

    }
}

export async function deleteRequestProxyController(request:Request, response:Response) {
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
    try{

    }
    catch(err){

    }
}

