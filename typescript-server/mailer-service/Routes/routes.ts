import { Router } from "express";
import {mailerService} from "../Controllers/controllers.js";

const routes:Router = Router();

routes.get("/", mailerService);


export default routes;