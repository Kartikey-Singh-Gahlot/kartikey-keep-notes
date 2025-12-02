const userModel = require('../Models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
   try{

   }
   catch(err){

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