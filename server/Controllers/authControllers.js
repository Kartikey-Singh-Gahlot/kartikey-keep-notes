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

const guestDestructor = async (req, res)=>{
  try{

  }
  catch(err){

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

const signout = async (req, res)=>{
    try{

    }
    catch(err){

    }
}

const checkAuth = async ()=>{
  try{

  }
  catch(err){

  }
}


module.exports = {signin, signup, signout, checkAuth, guestCreator, guestDestructor}