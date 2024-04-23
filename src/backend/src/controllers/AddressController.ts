import { Request, Response, Router } from "express";
import { AddressService } from "../services/AddressService";
import { Utils } from "../modules/utils/Utils";
import { AddressProperties, AddressProps } from "../types/AddressTypes";
import { Security } from "../modules/utils/Security";

export const AddressController = Router();
AddressController.get('/:customerId/address', Security.middleware, async (req: Request, res: Response) => {
    try {
        const address = await AddressService.getByCustomerId(req.params.customerId);

        return res.status(200).send(address);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

AddressController.post('/:customerId/address', Security.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, AddressProps)) {
            return res.status(400).send("Bad Request");
        }

        const address = await AddressService.post(req.params.customerId, req.body);
        return res.status(200).send(address)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

AddressController.put('/:customerId/address', Security.middleware, async (req: Request, res: Response) => {
    try {
        const addressUpdate = Utils.filterObject<(keyof AddressProperties)[], AddressProperties>(req.body, AddressProps);
        if (!addressUpdate || Object.keys(addressUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const address = await AddressService.put(req.params.customerId, addressUpdate);
        return res.status(200).send(address)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
