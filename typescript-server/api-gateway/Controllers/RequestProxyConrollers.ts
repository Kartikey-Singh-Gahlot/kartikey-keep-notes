import { Request, Response } from "express";
import ResponseEntity from "../../shared/interfaces/responseEntityInterface"
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";




export async function requestProxyController(request:extendedRequest, response:Response) {
    const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {}, {name:"", value:"", options:""});
    const options: RequestInit = {
          method: request.method,
          headers: request.headers as HeadersInit,
          credentials: "include",
    };
    try{
       if(request.method !== "GET"){
         options.body = JSON.stringify(request.body);
       }
       const query = await fetch(`${request.headers["x-service-api-url"]}`, options);
       const respondedData = await query.json();    
       if(!respondedData.status){
          responsePayLoad.status=false;
          responsePayLoad.code=respondedData.code;
          responsePayLoad.body=respondedData.body;
          return response.status(400).json(responsePayLoad);
       }
       if(respondedData.cookieData){
         response.cookie(respondedData.cookieData.name, JSON.stringify(respondedData.cookieData.value), respondedData.cookieData.options);
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
