import express from 'express';
import morgan from 'morgan';

import { port } from './config';
import allRoutes from './routes/routes';

const app = express();
const logger = morgan('combined');

allRoutes.forEach(routeConfig => app.use(routeConfig.path, routeConfig.router));
app.use(logger);
app.listen(port, () => process.stdout.write(`Server started, listening on port ${port}`));
