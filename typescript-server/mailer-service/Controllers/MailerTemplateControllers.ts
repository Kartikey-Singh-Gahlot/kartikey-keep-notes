import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import { transporter } from "../Config/nodeMailerConfiguration";
import MailerTemplatesModel from "../Models/MailerTemplatesModel";


export async function getTemplate(request:extendedRequest, response:Response){
   const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
   try{
       const {templateName} = request.query;
       const templateData = await MailerTemplatesModel.findOne({templateName});
       if(!templateData){   
         responsePayLoad.status=false;
         responsePayLoad.code="TEMPLATE_NOT_FOUND";
         responsePayLoad.body="Template Not Found";
         return response.status(404).json(responsePayLoad);
       }
       responsePayLoad.status=true;
       responsePayLoad.code="TEMPLATE_FOUND";
       responsePayLoad.body=templateData;
       return response.status(200).json(responsePayLoad);
   }
   catch(err:any){
      responsePayLoad.status=false;
      responsePayLoad.code="INTERNAL_SERVER_ERROR";
      responsePayLoad.body={message: "Internal Server Error", error: err.message};
      return response.status(500).json(responsePayLoad);
   }
}
