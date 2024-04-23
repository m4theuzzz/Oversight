import { Request, Response, Router } from "express";
import { BudgetService } from "../services/BudgetService";
import { Utils } from "../modules/utils/Utils";
import { BudgetProperties, BudgetProps } from "../types/BudgetTypes";
import { Filters, FiltersProps } from "../types/MiscTypes";
import { Security } from "../modules/utils/Security";

export const BudgetController = Router();

BudgetController.get('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budget = await BudgetService.getAll(String(req.headers['company-id']), req.query);

        return res.status(200).send(budget);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetController.get('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budget = await BudgetService.getById(String(req.headers['company-id']), req.params.id);

        return res.status(200).send(budget);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, BudgetProps)) {
            return res.status(400).send("Bad Request");
        }

        const budget = await BudgetService.post(String(req.headers['company-id']), String(req.headers['user-id']), req.body);
        return res.status(200).send(budget)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetController.put('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budgetUpdate = Utils.filterObject<(keyof BudgetProperties)[], BudgetProperties>(req.body, BudgetProps);
        if (!budgetUpdate || Object.keys(budgetUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const budget = await BudgetService.put(String(req.headers['company-id']), req.params.id, budgetUpdate);
        return res.status(200).send(budget)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetController.delete('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budget = await BudgetService.delete(String(req.headers['company-id']), req.params.id);
        return res.status(200).send(budget)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
