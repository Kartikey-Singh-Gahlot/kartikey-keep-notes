const googleRouter = require('express').Router();
require('../Config/passport.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');


googleRouter.get("/auth/google",passport.authenticate("google",{scope:["profile", "email"], prompt:"select_account"}));

googleRouter.get("/auth/google/callback", passport.authenticate("google", {session:false}),
  async (req, res)=>{
    try{
      const {themeCookie} = req.cookies;
      const {user, newUser} = req.user;

      if(newUser && themeCookie){
        try{
          const themeValid = jwt.verify(themeCookie, process.env.SECRETKEY);
          await userModel.findByIdAndUpdate(user._id,{$set:{lightTheme:themeValid.lightTheme}});
        }
        catch(err){
          console.log("Invalid");
        }
      }
      const token = jwt.sign({id:user._id, email:user.email}, process.env.SECRETKEY, {expiresIn:"7d"});
      const cookieDetails = {
        httpOnly: true,
        secure: true,      
        sameSite: "None",
        maxAge : 7*24*60*60*1000,
      }
      res.cookie("authCookie",token, cookieDetails);
      res.redirect(`${process.env.FRONTEND_LINK_STRING}/dashboard`)
    }catch(err){
      return res.status(500).json({
        status : false,
        body : `Internal Server Error : ${err.message}`
      })
    }
  }
);

module.exports = googleRouter;