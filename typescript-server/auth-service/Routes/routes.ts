import { Router } from "express";
import {getGuest, createGuest, guestController} from "../Controllers/GuestControllers.js";
import {authController, getUser} from "../Controllers/AuthControllers.js";


const routes:Router = Router();



//Guest Routes
routes.get("/", guestController);
routes.get("/guest", getGuest);
routes.post("/guest", createGuest);


//Auth Routes
routes.get("/", authController);
routes.get("/user", getUser);
// routes.get("");
// routes.get("");
// routes.get("");
// routes.get("");



export default routes;