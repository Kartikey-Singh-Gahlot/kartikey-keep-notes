const { guestCreator, checkAuth, signOut } = require('../Controllers/authControllers.js');

const authRouter = require('express').Router();



authRouter.post("/auth/guest", guestCreator );
authRouter.get("/auth/user", checkAuth);
authRouter.get("/auth/user/signout", signOut);






module.exports = authRouter;