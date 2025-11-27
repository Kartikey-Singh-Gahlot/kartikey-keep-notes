const utilityRouter = require('express').Router();
const {getUserDetails, checkGuestTheme} = require("../Controllers/utilityControllers.js");

utilityRouter.get("/util/user", getUserDetails);
utilityRouter.get("/util/theme", checkGuestTheme);

module.exports = utilityRouter;