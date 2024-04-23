import { Request, Response, Router } from "express";
import { CustomerService } from "../services/CustomerService";
import { Utils } from "../modules/utils/Utils";
import { CustomerFilters, CustomerFiltersProps, CustomerProperties, CustomerProps } from "../types/CustomerTypes";
import { Security } from "../modules/utils/Security";

export const CustomerController = Router();

CustomerController.get('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.getAll(String(req.headers['company-id']), req.query);

        return res.status(200).send(customer);
    } catch (error) {
        console.log(error)
        return res.status(error.status ?? 500).send(error.message);
    }
});

CustomerController.get('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.getById(String(req.headers['company-id']), req.params.id);

        return res.status(200).send(customer);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CustomerController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, CustomerProps)) {
            return res.status(400).send("Bad Request");
        }

        const customer = await CustomerService.post(String(req.headers['company-id']), String(req.headers['user-id']), req.body);
        return res.status(200).send(customer)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CustomerController.put('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const customerUpdate = Utils.filterObject<(keyof CustomerProperties)[], CustomerProperties>(req.body, CustomerProps);
        if (!customerUpdate || Object.keys(customerUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const customer = await CustomerService.put(String(req.headers['company-id']), req.params.id, customerUpdate);
        return res.status(200).send(customer)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

CustomerController.delete('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const customer = await CustomerService.delete(String(req.headers['company-id']), req.params.id);
        return res.status(200).send(customer)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
