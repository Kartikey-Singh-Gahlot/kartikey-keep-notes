import { Router, Request, Response } from "express";
import { RequestPopulatorMiddleWare } from "../MiddleWares/RequestPopulatorMiddleWares";
import { postRequestProxyController, getRequestProxyController } from "../Controllers/RequestProxyConrollers";
import { LoggedInFirewall } from "../MiddleWares/GatewayFirewallMiddleWares";

const routes: Router = Router();


routes.post("/signup", RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/signup`), postRequestProxyController);
routes.post("/login", RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/login`), postRequestProxyController);
routes.get("/checkAuth",  LoggedInFirewall, RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/check`), getRequestProxyController)



export default routes;