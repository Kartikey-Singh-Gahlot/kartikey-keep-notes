import { Router } from "express";
import {getGuest, createGuest, guestController} from "../Controllers/GuestControllers.js";
import {getUser, createUser, checkAuth} from "../Controllers/AuthControllers.js";


const routes:Router = Router();



//Guest Routes
routes.get("/guest", getGuest);
routes.post("/guest", createGuest);


//Auth Routes
routes.get("/auth", checkAuth);
routes.get("/user", getUser);
routes.post("/user", createUser);
// routes.get("");
// routes.get("");
// routes.get("");
// routes.get("");



export default routes;