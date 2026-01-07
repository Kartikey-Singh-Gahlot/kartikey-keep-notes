const { guestCreator, checkAuth, signOut, signup, signin, signupOtpVerification, signinOtpVerification } = require('../Controllers/authControllers.js');
const {getUserDetails, checkGuestTheme, contact, editNote, setUserTheme} = require("../Controllers/utilityControllers.js");
const limiter = require("../Middlewares/rateLimiter.js");

const Router = require('express').Router();



Router.post("/auth/guest", guestCreator);

Router.get("/auth/user", checkAuth);

Router.post("/auth/user/signup",signup);
Router.post("/auth/user/signupOtpVerification", signupOtpVerification);


Router.post("/auth/user/signout",signOut);

Router.post("/auth/user/signin",signin);
Router.post("/auth/user/signinOtpVerification", signinOtpVerification);








Router.get("/guest/theme", checkGuestTheme);
Router.post("/contact", limiter, contact);

Router.get("/user", getUserDetails);
Router.patch("/user/theme", setUserTheme);
Router.patch("/user",editNote);




module.exports = Router;