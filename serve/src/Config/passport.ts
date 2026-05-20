import userModel from '../Models/userModel.js';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20' ;
import "dotenv/config";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.BACKEND_LINK_STRING}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, cb) =>{
    try{
      let user = await userModel.findOne({ googleId: profile.id });
      let newUser = false;
      if(!user){
         const email = profile.emails?.[0]?.value;
         if (!email) {
           return cb(new Error("Google email not found"), undefined);
         }

         user = await userModel.findOne({email});

         if(user){
            user.googleId = profile.id;
            await user.save();
         }
         else{
            newUser = true;
            user = new userModel({
              name: profile.displayName,
              email: email,
              googleId: profile.id,
              password: null,
              isVerified : true,
              subjects:[]
            });
            await user.save();
         }
      }
      return cb(null, {user, newUser});
    }
    catch(err){
        return  cb(err, undefined);
    }
  }
));

export default  passport;
