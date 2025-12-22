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
        const valid = jwt.verify(themeCookie, process.env.SECRETKEY);
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
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password, salt);
     const otp = Math.floor(1000 + Math.random() * 9000)+"";
     const hashedOtp = await bcrypt.hash(otp, salt);
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
    const valid = jwt.verify(authCookie, process.env.SECRETKEY);
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


module.exports = {signin, signup, signOut, checkAuth, guestCreator}