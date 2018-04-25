import { Router } from 'express';

import CpmuRouter from './CpmuRouter';

class DataRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  init() {
    this.router.use('/cpmu', CpmuRouter)
  }
}

const dataRouter = new DataRouter();
dataRouter.init();

export default dataRouter.router;
