const { guestCreator, checkAuth } = require('../Controllers/authControllers.js');

const authRouter = require('express').Router();



authRouter.post("/auth/guest", guestCreator );
authRouter.get("/auth/user", checkAuth);






module.exports = authRouter;