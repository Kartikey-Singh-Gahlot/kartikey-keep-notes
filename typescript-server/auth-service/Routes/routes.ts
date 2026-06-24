import { Router } from "express";
import {login, signup, checkAuth, createGuest, getGuest} from "../Controllers/AuthControllers.js";
import { otpVerification } from "../Controllers/VerificationControllers.js";
import { authFirewall, themeFirewall } from "../MiddleWares/authenticationMiddleWares.js";

const routes:Router = Router();



//Guest Routes
routes.post("/guest",createGuest);
routes.get("/guest", themeFirewall, getGuest)


//Auth Routes
routes.get("/auth/check", authFirewall,checkAuth);
routes.post("/auth/login", login);
routes.post("/auth/signup", signup);

//Verification Routes
routes.post("/verification/otp", otpVerification);



export default routes;