import { Response, Router } from "express";

const healthRouter = Router();

healthRouter.get('/', (_, res: Response) => {
    res.sendStatus(200);
});

export default healthRouter;
