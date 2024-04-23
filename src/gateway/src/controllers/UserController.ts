import { Request, Response, Router } from "express";
import { Auth } from "../modules/Auth";
import { UserService } from "../services/UserService";
import { Utils } from "../modules/utils/Utils";
import { UserProperties, UserProps } from "../types/UserTypes";

export const UserController = Router();

UserController.get('/', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const user = await UserService.getAll(String(req.headers['company-id']));

        return res.status(200).send(user);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

UserController.get('/:id', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const user = await UserService.getById(String(req.headers['company-id']), req.params.id);

        return res.status(200).send(user);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

UserController.post('/', Auth.middleware, async (req: Request, res: Response) => {
    try {
        if (!Utils.isType(req.body, UserProps)) {
            return res.status(400).send("Bad Request");
        }

        const user = await UserService.post(String(req.headers['company-id']), req.sessionID, req.body);
        return res.status(200).send(user)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

UserController.put('/:id', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const userUpdate = Utils.filterObject<(keyof UserProperties)[], UserProperties>(req.body, UserProps);
        if (!userUpdate || Object.keys(userUpdate).length == 0) {
            return res.status(400).send("Bad Request");
        }

        const user = await UserService.put(String(req.headers['company-id']), req.params.id, userUpdate);
        return res.status(200).send(user)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});

UserController.delete('/:id', Auth.middleware, async (req: Request, res: Response) => {
    try {
        const user = await UserService.delete(String(req.headers['company-id']), req.params.id);
        return res.status(200).send(user)
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
