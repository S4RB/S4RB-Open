import express from 'express';
import csv from 'csvtojson';

import { csvDataFilePath} from '../config';

export const dataRouter = express.Router();

dataRouter.get('/', (req, res) => {
    csv()
        .fromFile(csvDataFilePath)
        .then(
            jsonObj => res.json(jsonObj),
            reason => res.send(reason)
    );
});
