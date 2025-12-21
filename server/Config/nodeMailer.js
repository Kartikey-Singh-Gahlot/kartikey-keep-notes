const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure:true,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:"kartikey.keep.notes",
        pass:"wwfe vtwg xvem tkxl"
    }
});


const mailerFunction = (to, sub, msg)=>{
  transporter.sendMail({
    to:to,
    subject:sub,
    html:msg
  });
}

module.exports = {mailerFunction};