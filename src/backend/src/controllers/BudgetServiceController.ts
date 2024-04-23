import { Request, Response, Router } from "express";
import { BudgetServiceService } from "../services/BudgetServiceService";
import { Utils } from "../modules/utils/Utils";
import { BudgetServiceProperties, BudgetServiceProps } from "../types/BudgetServiceTypes";
import { Filters, FiltersProps } from "../types/MiscTypes";
import { Security } from "../modules/utils/Security";
import { UUID } from "../modules/utils/UUID";

export const BudgetServiceController = Router();

BudgetServiceController.get('/:budgetId/services', Security.middleware, async (req: Request, res: Response) => {
    try {
        const filters = Utils.filterObject<(keyof Filters)[], Filters>(req.query, FiltersProps);
        const budgetService = await BudgetServiceService.getAll(UUID.fromString(req.headers['company-id'] as string), req.params.budgetId, filters);

        return res.status(200).send(budgetService);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetServiceController.get('/:budgetId/services/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budgetService = await BudgetServiceService.getById(req.params.budgetId, req.params.id);

        return res.status(200).send(budgetService);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetServiceController.post('/:budgetId/services', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, BudgetServiceProps)) {
            return res.status(400).send("Bad Request");
        }

        const budgetService = await BudgetServiceService.post(req.params.budgetId, String(req.headers['user-id']), req.body);
        return res.status(200).send(budgetService)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetServiceController.put('/:budgetId/services/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budgetServiceUpdate = Utils.filterObject<(keyof BudgetServiceProperties)[], BudgetServiceProperties>(req.body, BudgetServiceProps);
        if (!budgetServiceUpdate || Object.keys(budgetServiceUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const budgetService = await BudgetServiceService.put(req.params.budgetId, req.params.id, budgetServiceUpdate);
        return res.status(200).send(budgetService)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

BudgetServiceController.delete('/:budgetId/services/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const budgetService = await BudgetServiceService.delete(req.params.budgetId, req.params.id);
        return res.status(200).send(budgetService)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
