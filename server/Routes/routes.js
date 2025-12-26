const { guestCreator, checkAuth, signOut, signup, signin, otpVerification } = require('../Controllers/authControllers.js');
const {getUserDetails, checkGuestTheme} = require("../Controllers/utilityControllers.js");


const Router = require('express').Router();



Router.post("/auth/guest", guestCreator );

Router.get("/auth/user", checkAuth);
Router.post("/auth/user/otpVerification", otpVerification);
Router.post("/auth/user/signout",signOut);
Router.post("/auth/user/signin",signin);
Router.post("/auth/user/signup",signup);






Router.get("/guest/theme", checkGuestTheme);
Router.get("/user", getUserDetails);





module.exports = Router;