import { Router } from "express";
import { sendMail } from "../Controllers/MailerControllers.js";
import { sendMailFirewall } from "../Middlewares/MailerMiddleWares.js";
import { serviceInternalCommunicationFirewall } from "../../shared/MiddleWares/ServiceInternalMiddlewares.js";


const routes:Router = Router();

routes.post("/mail",serviceInternalCommunicationFirewall, sendMailFirewall, sendMail);


export default routes;