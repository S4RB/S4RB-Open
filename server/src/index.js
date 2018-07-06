import express from 'express';
import morgan from 'morgan';

import { port } from './config';
import cpmuDataRouter from './routes/data.route';

const app = express();
const logger = morgan('combined');

app.use(logger);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/data/cpmu', cpmuDataRouter);
app.use('/', express.static('dist/public'));
app.listen(port, () => process.stdout.write(`Server started, listening on port ${port}`));
