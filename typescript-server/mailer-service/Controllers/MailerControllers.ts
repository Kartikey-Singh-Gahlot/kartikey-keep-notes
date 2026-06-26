import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import { extendedRequest } from "../../shared/interfaces/middleWareInterfaces";
import { transporter } from "../Config/nodeMailerConfiguration";


export async function sendMail(request:extendedRequest, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<Object>= new ResponseEntity(true, "", {});
   if(!request.mailData){
      responsePayLoad.status=false;
      responsePayLoad.code="INVALID_DATA";
      responsePayLoad.body="Invalid Data";
      return response.status(401).json(responsePayLoad);
   }
   try{
       const {to, subject, msg} = request.mailData;
       await transporter.sendMail({
            from: `Keep Notes <${process.env.MAILER_SMTP_USER}>`,
            to: String(to),
            subject: String(subject),
            html: String(msg),
       });
       responsePayLoad.status=true;
       responsePayLoad.code="MAIL_SENT";
       responsePayLoad.body="Mail Sent Successfully";
       return response.status(200).json(responsePayLoad);
   }
   catch(err){
      responsePayLoad.status=false;
      responsePayLoad.code="INTERNAL_SERVER_ERROR";
      responsePayLoad.body={message: "Internal Server Error", error: err.message};
      return response.status(500).json(responsePayLoad);
   } 
}