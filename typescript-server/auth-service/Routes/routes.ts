import { Router } from "express";
import {getGuest, createGuest} from "../Controllers/GuestControllers.js";

const routes:Router = Router();

routes.get("/guest", getGuest);
routes.post("/guest", createGuest);


export default routes;