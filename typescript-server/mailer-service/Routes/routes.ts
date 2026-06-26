import { Router } from "express";
import { sendMail } from "../Controllers/MailerControllers.js";
import { sendMailFirewall } from "../Middlewares/MailerMiddleWares.js";
import { serviceInternalCommunicationFirewall } from "../../shared/MiddleWares/ServiceInternalMiddlewares.js";
import { getTemplate } from "../Controllers/MailerTemplateControllers.js";


const routes:Router = Router();

routes.post("/mailer/sendMail",serviceInternalCommunicationFirewall, sendMailFirewall, sendMail);
routes.get("/mailer/template", serviceInternalCommunicationFirewall, getTemplate )

export default routes;