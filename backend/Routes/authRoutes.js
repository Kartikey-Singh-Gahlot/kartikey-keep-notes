const { guestCreator } = require('../Controllers/authControllers.js');
const {checkGuestTheme} = require("../Controllers/utilityControllers.js");

const authRouter = require('express').Router();



authRouter.post("/auth/guest", guestCreator );





module.exports = authRouter;