import { Router } from "express";
import {login, signup, checkAuth, createGuest, getGuest} from "../Controllers/AuthControllers.js";
import { otpVerification } from "../Controllers/VerificationControllers.js";
import { authIdValidationFirewall, themeFirewall, signupValidationFirewall, loginValidationFirewall,  } from "../MiddleWares/AuthenticationMiddleWares.js";
import { otpValidationFirewall } from "../MiddleWares/VerificationMiddleWares.js";
import { serviceInternalCommunicationFirewall } from "../../shared/MiddleWares/ServiceInternalMiddlewares.js";

const routes:Router = Router();



//Guest Routes
routes.post("/auth/guest",serviceInternalCommunicationFirewall, createGuest);
routes.get("/auth/guest",serviceInternalCommunicationFirewall, themeFirewall, getGuest)


//Auth Routes
routes.get("/auth/check",serviceInternalCommunicationFirewall, authIdValidationFirewall, checkAuth);
routes.post("/auth/login",serviceInternalCommunicationFirewall, loginValidationFirewall, login);
routes.post("/auth/signup",serviceInternalCommunicationFirewall, signupValidationFirewall, signup);

//Verification Routes
routes.post("/auth/verify",serviceInternalCommunicationFirewall, otpValidationFirewall, otpVerification);



export default routes;