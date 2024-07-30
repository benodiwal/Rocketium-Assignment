import { Router, Response } from "express";

const dataRouter = Router();

dataRouter.get('/', (_, res: Response) => {
    res.sendStatus(200);
});

export default dataRouter;
