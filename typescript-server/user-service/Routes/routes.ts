import { Router } from "express";
import {createUser, getUser} from "../Controllers/UserControllers";
import { createUserFirewall, getUserFirewall } from "../MiddleWares/UserMiddleWares";
const routes:Router = Router();
import { serviceInternalCommunicationFirewall } from "../../shared/MiddleWares/ServiceInternalMiddlewares.js";


routes.post("/user", serviceInternalCommunicationFirewall, createUserFirewall, createUser);
routes.get("/user", serviceInternalCommunicationFirewall, getUserFirewall, getUser);


export default routes;