require('dotenv').config();
const {mailerFunction} = require('../Config/nodeMailer.js');

const otpSending = async (req, res, next)=>{
  const {name, email, password} = req.body;
  try{
    mailerFunction(email, "Otp Verification By Keep Notes", `${otp}`); 
    next();
  }
  catch(err){
    res.status(500).json({
     status: false,
     body : `${err.message}`
    })
  }
  
}

const otpVerification = (req, res, next)=>{
  console.log("verify");
}

module.exports = {otpSending, otpVerification};