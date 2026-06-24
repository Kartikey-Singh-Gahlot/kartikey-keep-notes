import { Router } from "express";
import {createUser, getUser} from "../Controllers/UserControllers";
import { createUserFirewall } from "../MiddleWares/UserMiddleWares";
const routes:Router = Router();


routes.post("/user", createUserFirewall,  createUser);
routes.get("/user", getUser);


export default routes;