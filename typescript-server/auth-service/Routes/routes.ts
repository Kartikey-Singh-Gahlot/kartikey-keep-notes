import { Router } from "express";
import {login, signup, checkAuth, createGuest, getGuest} from "../Controllers/AuthControllers.js";
import { authFirewall, themeFirewall } from "../MiddleWares/authenticationMiddleWares.js";

const routes:Router = Router();



//Guest Routes
routes.post("/guest",createGuest);
routes.get("/guest", themeFirewall, getGuest)


//Auth Routes
routes.get("/auth", authFirewall,checkAuth);
routes.get("/user", login);
routes.post("/user", signup);
// routes.get("");
// routes.get("");
// routes.get("");
// routes.get("");



export default routes;