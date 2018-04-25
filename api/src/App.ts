import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import DataRouter from './routes/DataRouter';
import IndexRouter from './routes/IndexRouter';
import ENV from './ENV';
import * as cors from 'cors';
import middleWere from './shared/middleWere';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.express.set('dirname', __dirname);
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(middleWere);
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use(ENV.version + '/data', DataRouter);
    this.express.use(ENV.version + '/', IndexRouter);
  }
}

export default new App().express;
