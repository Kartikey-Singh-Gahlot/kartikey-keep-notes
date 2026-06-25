import { Router } from "express";
import {createUser, getUser} from "../Controllers/UserControllers";
import { createUserFirewall } from "../MiddleWares/UserMiddleWares";
const routes:Router = Router();
import { serviceInternalCommunicationFirewall } from "../../shared/MiddleWares/ServiceInternalMiddlewares.js";


routes.post("/user", serviceInternalCommunicationFirewall,  createUser);
routes.get("/user", serviceInternalCommunicationFirewall, createUserFirewall, getUser);


export default routes;