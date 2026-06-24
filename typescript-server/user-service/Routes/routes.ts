import { Router } from "express";
import {createUser, getUser} from "../Controllers/UserControllers";
import { createUserFirewall } from "../MiddleWares/UserMiddleWares";
const routes:Router = Router();


routes.post("/user", createUserFirewall,  createUser);
routes.get("/user", createUserFirewall, getUser);


export default routes;