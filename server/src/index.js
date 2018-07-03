import express from 'express';
import { registerAllRoutes } from './routes/routes';

const app = express();

registerAllRoutes(app);

app.listen(8000, () => {
    console.log('Server started, listening on port 8000');
});
