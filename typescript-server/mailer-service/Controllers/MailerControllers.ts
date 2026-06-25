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
       const {to, sub, msg} = request.mailData;
       await transporter.sendMail({
            from: `Keep Notes <${process.env.MAILER_SMTP_USER}>`,
            to: String(to),
            subject: String(sub),
            html: String(msg),
       });
       responsePayLoad.status=true;
       responsePayLoad.code="MAIL_SENT";
       responsePayLoad.body="Mail Sent Successfully";
       return response.status(200).json(responsePayLoad);
   }
   catch(err){
      responsePayLoad.code="INTERNAL_SERVER_ERROR",
      responsePayLoad.body="Auth Service Not Reachable !"
      return response.status(500).json()
   } 
}