const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');
const notesModel = require('../Models/notesModel.js');
require('dotenv').config();

const checkGuestTheme = async (req, res)=>{
  const {themeCookie} = req.cookies;
  if(!themeCookie){
    res.status(400).json({
        status:false,
        body :"New User"
    })
  }
  else{
    try{
      const guest = jwt.verify(themeCookie, process.env.SECRETKEY);
      res.status(200).json({
         status : true,
         body : guest
      })
    }
    catch(err){
       res.status(500).json({
        status:false,
        body : `Internal Server Error ${err.message}`
       })
    }
    
  }
}

const getUserDetails = async (req,res)=>{
    const {authCookie, themeCookie} = req.cookies;
    let theme = true;
    try{
      if(themeCookie){
         const themeValid = jwt.verify(themeCookie, process.env.SECRETKEY);
         if(themeValid?.lightTheme==false){
            theme = false;
         }
      }
      if(authCookie){
        const valid = jwt.verify(authCookie, process.env.SECRETKEY);
        const email = valid.email;
        const cookieDetails = { httpOnly: true, secure: true, sameSite: "None", path: "/" }
        const user = await userModel.findOne({email}).populate("notes");
        res.clearCookie("themeCookie", cookieDetails);
        return res.status(200).json({
          status : true,
          body : {email:user.email, name:user.name, lightTheme:theme, notes:user.notes}
        })
      }
      return res.status(401).json({
        status:false,
        body:"Authentication Required"
      })  
    }
    catch(err){
      console.log(err);
      res.status(500).json({
        status : false,
        body : `Internal Server Error ${err.message}` 
      })
    }
}

const setUserTheme = async (req, res)=>{
   const {authCookie} = req.cookies;
   const {theme} = req.body;
   if(!authCookie){
     return req.status(401).json({
       status : false,
       body : "Authentication Required"
     });
   }
   try{
      const valid = jwt.verify(authCookie, process.env.SECRETKEY);
      console.log(valid);
      const user = await userModel.findOneAndUpdate({email:valid.email}, {});
      if(!user){
        return req.status(404).json({
          status:false,
          body : "User Not Found"
        })
      }
      return res.status(200).json({
        status:true,
        body : "Theme Changed"
      })
   }
   catch(err){
     return res.status(500).json({
      status : false,
      body: "Internal Server Error"
     })
   }

}

module.exports = {checkGuestTheme, getUserDetails, setUserTheme}