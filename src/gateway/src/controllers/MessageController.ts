import { Request, Response, Router } from "express";
import { Auth } from "../modules/Auth";
import { Gateway } from "../modules/gateway";
import { Security } from "../modules/utils/Security";

export const MessageController = Router();

MessageController.all('*', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const headers = {
            "company-id": String(req.headers['company-id']),
            "budget-id": String(req.headers['budget-id']),
            "auth-token": Security.genHash()
        }

        const body = Object.keys(req.body).length > 0 ? req.body : null;

        const response = await Gateway.redirect(req.method, req.originalUrl, headers, body, true);

        return res.status(response.status).send(response.data);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).send(error.message);
        } else {
            return res.status(500).send(error.message);
        }
    }
});
