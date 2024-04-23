import { Request, Response, Router } from "express";
import { CompanyService } from "../services/CompanyService";
import { Utils } from "../modules/utils/Utils";
import { CompanyProperties, CompanyProps } from "../types/CompanyTypes";
import { Security } from "../modules/utils/Security";

export const CompanyController = Router();

CompanyController.get('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const company = await CompanyService.getAll(req.query);

        return res.status(200).send(company);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CompanyController.get('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const company = await CompanyService.getById(req.params.id);

        return res.status(200).send(company);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CompanyController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, CompanyProps)) {
            return res.status(400).send("Bad Request");
        }

        const company = await CompanyService.post(req.body);
        return res.status(200).send(company)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CompanyController.put('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const companyUpdate = Utils.filterObject<(keyof CompanyProperties)[], CompanyProperties>(req.body, CompanyProps);
        if (!companyUpdate || Object.keys(companyUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const company = await CompanyService.put(req.params.id, companyUpdate);
        return res.status(200).send(company)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CompanyController.delete('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const company = await CompanyService.delete(req.params.id);
        return res.status(200).send(company)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
