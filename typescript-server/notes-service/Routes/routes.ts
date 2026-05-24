import { Router } from "express";
import {notesService} from "../Controllers/controllers.js";

const routes:Router = Router();

routes.get("/", notesService);


export default routes;