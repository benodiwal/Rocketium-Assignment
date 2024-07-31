import { Router, Response, Request } from "express";
import DataService from "libs/data.lib";
import QueryEngineService from "libs/engine.lib";

const dataRouter = Router();
const dataService = new DataService();

dataRouter.get('/', async (req: Request, res: Response) => {
    const data = await dataService.getData();
    const response = QueryEngineService.executeQueries(data, req.query);
    return res.json(response);
});

export default dataRouter;
