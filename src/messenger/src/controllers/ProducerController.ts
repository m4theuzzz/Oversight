import { Request, Response, Router } from "express";
import { Security } from "../modules/utils/Security";
import { Producer } from "../modules/Producer";
import { Message } from "../types/MessageTypes";

export const ProducerController = Router();

ProducerController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const message: Message = {
            title: "Email approval",
            approved: req.body.approved,
            description: req.body.description,
            companyId: String(req.headers['company-id']),
            budgetId: String(req.headers['budget-id']),
        }

        await Producer.post(message);

        console.log("produced")
        return res.status(200).send("Message posted successfuly.");
    } catch (error) {
        if (error.status) {
            return res.status(error.status).send(error.message);
        } else {
            return res.status(500).send(error.message);
        }
    }
});
