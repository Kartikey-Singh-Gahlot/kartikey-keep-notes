import "dotenv/config";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT || 465 ,
    secure:true,
    auth:{
         user: process.env.SMTP_USER || '',
         pass: process.env.SMTP_PASS || ''
    }
}as SMTPTransport.Options);


transporter.verify((err, success) => {
  if(err) {
    console.error("SMTP VERIFY FAILED");
    console.error(err);
  } else {
    console.log("SMTP READY");
  }
});



const mailerFunction = async (to: string, sub: string, msg: string): Promise<void> => {
  try{
      await transporter.sendMail({
        from: `Keep Notes <${process.env.SMTP_USER}>`, 
        to:to,
        subject:sub,
        html:msg
      });
  }
  catch(err){
     console.log(err);
  }
}

export default mailerFunction;