import { Request, Response, Router } from "express";
import { AuthService } from "../services/AuthService";
import { LoginProps } from "../types/AuthTypes";
import { Utils } from "../modules/utils/Utils";

export const AuthController = Router();

AuthController.post('/', async (req: Request, res: Response) => {
    try {
        const userLogin = req.body;

        if (!Utils.isType(userLogin, LoginProps)) {
            return res.status(400).send("Bad Request");
        }

        const user = await AuthService.login(userLogin);

        return res.status(200).send(user);
    } catch (error) {
        return res.status(error.status ?? 500).send(error.message);
    }
});
