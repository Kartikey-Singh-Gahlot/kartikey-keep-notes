const notesModel = require('../Models/notesModel.js');
const userModel = require('../Models/userModel.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_LINK_STRING}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, cb) =>{
    try{
      let user = await userModel.findOne({ googleId: profile.id });
      if(!user){
         const email = profile?.emails?.[0]?.value;
         user = await userModel.findOne({email});
         if(user){
            user.googleId = profile.id;
            await user.save();
         }
         else{
            user = new userModel({
              name: profile.displayName,
              email: email,
              googleId: profile.id,
              password: null,
              lightTheme: true,
              isVerified : true 
            });
            const newNote = new notesModel({
               notesTitle : `Welcome ${user.name}`,
               notesContent :"Welcome team keep notes welcomes you",
               user:user._id
            });
            await newNote.save();
            user.notes.push(newNote._id);
            await user.save();
         }
      }
      return cb(null, user);
    }
    catch(err){
        return done(err, null);
    }
  }
));

module.exports = passport;
