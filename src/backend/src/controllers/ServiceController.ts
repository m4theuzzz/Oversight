import { Request, Response, Router } from "express";
import { ServiceService } from "../services/ServiceService";
import { Utils } from "../modules/utils/Utils";
import { ServiceProperties, ServiceProps } from "../types/ServiceTypes";
import { Filters, FiltersProps } from "../types/MiscTypes";
import { Security } from "../modules/utils/Security";

export const ServiceController = Router();

ServiceController.get('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        const service = await ServiceService.getAll(String(req.headers['company-id']), req.query);

        return res.status(200).send(service);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

ServiceController.get('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const service = await ServiceService.getById(String(req.headers['company-id']), req.params.id);

        return res.status(200).send(service);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

ServiceController.post('/', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, ServiceProps)) {
            return res.status(400).send("Bad Request");
        }

        const service = await ServiceService.post(String(req.headers['company-id']), String(req.headers['user-id']), req.body);
        return res.status(200).send(service)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

ServiceController.put('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const serviceUpdate = Utils.filterObject<(keyof ServiceProperties)[], ServiceProperties>(req.body, ServiceProps);
        if (!serviceUpdate || Object.keys(serviceUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const service = await ServiceService.put(String(req.headers['company-id']), req.params.id, serviceUpdate);
        return res.status(200).send(service)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

ServiceController.delete('/:id', Security.middleware, async (req: Request, res: Response) => {
    try {
        const service = await ServiceService.delete(String(req.headers['company-id']), req.params.id);
        return res.status(200).send(service)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
