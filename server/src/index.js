import express from 'express';
import morgan from 'morgan';

import { port } from './config';
import cpmuDataRouter from './routes/data.route';

const app = express();
const logger = morgan('combined');

app.use(logger);
app.use('/data/cpmu', cpmuDataRouter);
app.listen(port, () => process.stdout.write(`Server started, listening on port ${port}`));
