import { Router, Request, Response } from "express";


const routes: Router = Router();

//Guest Routes
routes.get("/", (req: Request, res: Response) => {
    res.send("API Gateway Working");
});


export default routes;