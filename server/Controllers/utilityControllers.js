const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');
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
    const {authorizationCookie, themeCookie} = req.cookies;
    try{
      const valid = jwt.verify(authorizationCookie, process.env.SECRETKEY);
      let theme = true;
      if(themeCookie){
        const themeValid = jwt.verify(themeCookie, process.env.SECRETKEY);
        if(themeValid?.lightTheme==false){
         theme = false;
        }
      }
      const email = valid.email;
      const cookieDetails = { httpOnly: true, secure: true, sameSite: "None", path: "/" }
      const user = await userModel.findOne({email});
      res.clearCookie("themeCookie", cookieDetails);
      res.status(200).json({
        status : true,
        body : {email:user.email, name:user.name, lightTheme:theme, notes:user.notes}
      })
     
    }catch(err){
      console.log(err);
      res.status(500).json({
        status : false,
        body : err
      })
    }
}


module.exports = {checkGuestTheme, getUserDetails}