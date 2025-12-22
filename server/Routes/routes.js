const { guestCreator, checkAuth, signOut, signup } = require('../Controllers/authControllers.js');
const {getUserDetails, checkGuestTheme} = require("../Controllers/utilityControllers.js");
const { otpVerificationMailTemplate } = require('../Utils/emailTemplate.js');
const {mailerFunction} = require("../Config/nodeMailer.js");

const Router = require('express').Router();



Router.post("/auth/guest", guestCreator );
Router.get("/auth/user", checkAuth);
Router.post("/auth/user/signout", signOut);
Router.post("/auth/user",signup);





Router.get("/guest/theme", checkGuestTheme);
Router.get("/user", getUserDetails);





module.exports = Router;