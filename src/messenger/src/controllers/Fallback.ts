import { Request, Response, Router } from "express";

export const FallbackController = Router();

FallbackController.all('*', (req: Request, res: Response) => {
    res.status(404).send("Rota não existe.");
})