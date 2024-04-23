import { Request, Response, Router } from "express";
import { Security } from "../modules/utils/Security";
import { MailerService } from "../services/MailerService";


export const MailerController = Router();

MailerController.get('/token', Security.middleware, async (req: Request, res: Response) => {
    try {
        const resp = await MailerService.getToken(String(req.headers['company-id']), String(req.headers['budget-id']));
        res.status(200).send({ 'message-token': resp });
    } catch (error) {
        if (error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

MailerController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const resp = await MailerService.send(String(req.headers['company-id']), req.body);
        res.status(200).send(resp);
    } catch (error) {
        if (error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});
