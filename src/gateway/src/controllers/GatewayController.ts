import { Request, Response, Router } from "express";
import { Gateway } from "../modules/gateway";
import { Auth } from "../modules/Auth";
import { AuthHeaders } from "../types/RequestTypes";
import { UUID } from "../modules/utils/UUID";
import { userRoleFromString } from "../types/UserTypes";
import { Security } from "../modules/utils/Security";

export const GatewayController = Router();

GatewayController.all('*', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const headers: AuthHeaders = {
            "company-id": UUID.fromString(String(req.headers['company-id'])),
            "user-id": UUID.fromString(String(req.sessionID)),
            "role": userRoleFromString(String(req.headers['role'])),
            "auth-token": Security.genHash(),
            "budget-id": String(req.headers['budget-id']) ?? null,
        }
        console.log("----- Received Gateway Headers -----", req.headers);
        console.log("----- Sent Gateway Headers -----", headers);

        const body = Object.keys(req.body).length > 0 ? req.body : null;

        const response = await Gateway.redirect(req.method, req.originalUrl, headers, body);

        return res.status(response.status).send(response.data);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).send(error.message);
        } else {
            return res.status(500).send(error.message);
        }
    }
});
