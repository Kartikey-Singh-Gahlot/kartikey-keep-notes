import { Router, Request, Response } from "express";
import { RequestPopulatorMiddleWare } from "../MiddleWares/RequestPopulatorMiddleWares";
import { requestProxyController } from "../Controllers/RequestProxyConrollers";
import { LoggedInFirewall } from "../MiddleWares/GatewayFirewallMiddleWares";

const routes: Router = Router();


routes.post("/signup",LoggedInFirewall(false),  RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/signup`), requestProxyController);
routes.post("/login", LoggedInFirewall(false), RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/login`), requestProxyController);
routes.get("/checkAuth", LoggedInFirewall(true), RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/check`), requestProxyController)

routes.get("/guest", LoggedInFirewall(false), RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/guest`), requestProxyController);
routes.post("/guest",LoggedInFirewall(false),  RequestPopulatorMiddleWare(`${process.env.AUTH_SERVICE_API_URL}/auth/guest`), requestProxyController);


export default routes;