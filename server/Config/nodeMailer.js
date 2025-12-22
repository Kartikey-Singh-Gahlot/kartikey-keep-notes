require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure:true,
    auth:{
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS
    }
});


const mailerFunction = async (to, sub, msg)=>{
  try{
      await transporter.sendMail({
        from: `"Keep Notes" <${process.env.SMTP_USER}>`, 
        to:to,
        subject:sub,
        html:msg
      });
  }
  catch(err){
     console.log(err);
  }
}

module.exports = {mailerFunction};