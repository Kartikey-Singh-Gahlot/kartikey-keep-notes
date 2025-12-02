const googleRouter = require('express').Router();
require('../Config/passport.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');


googleRouter.get("/auth/google",passport.authenticate("google",{scope:["profile", "email"], prompt:"select_account"}));

googleRouter.get("/auth/google/callback", passport.authenticate("google", {session:false}),
  (req, res)=>{
    try{
      if(!req.user){ 
        return res.redirect(`${process.env.FRONTEND_LINK_STRING}/auth/signup`)
      }
      const token = jwt.sign({id:req.user._id, email:req.user.email}, process.env.SECRETKEY, {expiresIn:"7d"});
      const cookieDetails = {
        httpOnly: true,
        secure: true,     
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
      res.cookie("authCookie",token, cookieDetails);
      res.redirect(`${process.env.FRONTEND_LINK_STRING}/dashboard`)
    }catch(err){
      return res.status(500).json({
        status : false,
        body : "Internal Server Error"
      })
    }
  }
);

module.exports = googleRouter;