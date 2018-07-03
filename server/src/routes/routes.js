import { dataRouter } from './data.route';

export const registerAllRoutes = (app) => {
    app.use('/data/cpmu', dataRouter);
};
