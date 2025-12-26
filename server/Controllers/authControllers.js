const userModel = require('../Models/userModel.js');
const notesModel = require("../Models/notesModel.js");
const {mailerFunction} = require("../Config/nodeMailer.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { otpVerificationMailTemplate } = require('../Utils/emailTemplate.js');
require('dotenv').config();


const guestCreator = async (req, res)=>{
    const {themeCookie} = req.cookies;
    const {lightTheme} = req.body;
    if(!themeCookie){
      const themeDetails = jwt.sign({lightTheme}, process.env.SECRETKEY);
      const cookieDetails = {
        httpOnly: true,
        secure: true,      
        sameSite: "None",
        maxAge : 7*24*60*60*1000,
      }
      res.cookie("themeCookie", themeDetails, cookieDetails);
      return res.status(200).json({
        status : true,
        body : "Guest Created"
      })
    }
    else{
       try{
        jwt.verify(themeCookie, process.env.SECRETKEY);
        const themeDetails = jwt.sign({lightTheme}, process.env.SECRETKEY);
        const cookieDetails = {
          httpOnly: true,
          secure: true,      
          sameSite: "None",
          maxAge : 7*24*60*60*1000,
        }
        res.cookie("themeCookie", themeDetails, cookieDetails);
        return res.status(200).json({
          status : true,
          body : `Theme Changed : ${valid.lightTheme}`
        })
       }
       catch(err){
         res.status(500).json({
          status :false,
          body :"Internal server Error"
         })
       }
    }
}


const signup = async (req, res)=>{
   const {name, email, password} = req.body;
   const exists = await userModel.findOne({email});
   if(exists){
     return res.status(409).json({
       status:false,
       body: "User Exists"
     })
   }
   try{
     const salt1 = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password, salt1);
     const otp = Math.floor(1000 + Math.random() * 9000)+"";
     const salt2 = await bcrypt.genSalt();
     const hashedOtp = await bcrypt.hash(otp.toString(), salt2);
     const otpExpiry = new Date(Date.now()+10*60*1000);
     const user = new userModel({name, email, password:hashedPassword, otp:hashedOtp, otpExpiry});
     const newNote = new notesModel({
        notesTitle : `Welcome ${user.name}`,
        notesContent :"Welcome team keep notes welcomes you",
        user:user._id
     });
     await newNote.save()
     user.notes.push(newNote._id);
     await user.save();
     await mailerFunction(email, "Otp Verification", otpVerificationMailTemplate(otp));
     const token = jwt.sign({id:user._id, email:user.email}, process.env.SECRETKEY, {expiresIn:"7d"});
     const cookieDetails ={
        httpOnly: true,
        secure: true,      
        sameSite: "None",
        maxAge : 7*24*60*60*1000,
     }
     res.cookie("authCookie",token, cookieDetails);
     return res.status(200).json({
       status:true,
       body : "Otp Verification Pending"
     })
   }
   catch(err){
     console.log(err);
     return res.status(500).json({ 
       status:false,
       body:`Internal Server Error ${err.message}`
     })
   }
}

const signin = async (req, res)=>{
    const {email, password} = req.body;
    try{

    }
    catch(err){

    }
}

const signOut = async (req, res)=>{
    try{
     const cookieDetails = {
         httpOnly: true,
         secure: true,
         sameSite: "None",
         path: "/"
      }
     res.clearCookie('authCookie', cookieDetails);
     res.status(200).json({
      status:true,
      body:"SignOut Successfull"
     })
    }
    catch(err){
      res.status(500).json({
        status:false,
        body:"Internal Server Error"
      })
    }
}

const checkAuth = async (req, res)=>{
  const {authCookie} = req.cookies;
  if(!authCookie){
    return res.status(409).json({
      status:false,
      body:"No Auth Token Found"
    })
  }
  try{
    jwt.verify(authCookie, process.env.SECRETKEY);
    return res.status(200).json({
      status:true,
      body:"Valid Auth Token Found"
    })
  }
  catch(err){
    return res.status(500).json({
      status:false,
      body:"Internal Server Error"
    })
  }
}

const otpVerification = async (req, res)=>{
    const {otp} = req.body;
    const {authCookie} = req.cookies;
    if(!authCookie){
      return res.status(409).json({
        status:false,
        body:"No Auth Token Found"
      })
    }
    try{
      const valid = jwt.verify(authCookie,process.env.SECRETKEY);
      const user = await userModel.findOne({email:valid.email}) .select("+otp +otpExpiry");
      if(!user){
        return res.status(404).json({
          status:false,
          body:"No User Found"
        });
      }
      if(!user.otpExpiry || Date.now()>user.otpExpiry){
        return res.status(400).json({
          status:false,
          body:"Otp Expired"
        })
      }

      const otpValidity = await bcrypt.compare(otp.toString(), user.otp);
      if(!otpValidity){
        return res.status(401).json({
          status:false,
          body:"Invalid Otp"
        })
      }
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(200).json({
        status:true,
        body:"Otp Verified"
      });
    }
    catch(err){
      return res.status(200).json({
        status:false,
        body :`Internal Server Error ${err.message}`
      })
    }
}


module.exports = {signin, signup, signOut, checkAuth, guestCreator, otpVerification}