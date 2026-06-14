import { Router } from "express";
import {login, signup, checkAuth, createGuest} from "../Controllers/AuthControllers.js";


const routes:Router = Router();



//Guest Routes
routes.post("/guest", createGuest);


//Auth Routes
routes.get("/auth", checkAuth);
routes.get("/user", login);
routes.post("/user", signup);
// routes.get("");
// routes.get("");
// routes.get("");
// routes.get("");



export default routes;