import { Router } from "express";
import {authService} from "../Controllers/authController.js";

const routes:Router = Router();

routes.get("/", authService);


export default routes;