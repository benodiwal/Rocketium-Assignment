import Express from 'express';
import logger from 'middlewares/logger.middleware';
import dataRouter from 'routes/data.route';
import healthRouter from 'routes/health.route';

const expressApp = Express();

expressApp.use(logger);
expressApp.use(Express.json());
expressApp.use('/health', healthRouter);
expressApp.use('/data', dataRouter);

export default expressApp;
