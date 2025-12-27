const { guestCreator, checkAuth, signOut, signup, signin, signupOtpVerification } = require('../Controllers/authControllers.js');
const {getUserDetails, checkGuestTheme} = require("../Controllers/utilityControllers.js");


const Router = require('express').Router();



Router.post("/auth/guest", guestCreator );

Router.get("/auth/user", checkAuth);
Router.post("/auth/user/signup",signup);
Router.post("/auth/user/signupOtpVerification", signupOtpVerification);

Router.post("/auth/user/signout",signOut);

Router.post("/auth/user/signin",signin);






Router.get("/guest/theme", checkGuestTheme);
Router.get("/user", getUserDetails);





module.exports = Router;