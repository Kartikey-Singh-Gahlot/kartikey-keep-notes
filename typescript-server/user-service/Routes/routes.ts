import { Router } from "express";
import {userService} from "../Controllers/controllers.js";

const routes:Router = Router();

routes.get("/", userService);


export default routes;