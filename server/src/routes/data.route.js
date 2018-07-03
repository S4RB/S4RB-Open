import express from 'express';
import cpmuService from '../services/cpmuService';

const dataRouter = express.Router();
dataRouter.get('/', (req, res) => cpmuService
  .getCpmuData()
  .then(
    jsonObj => res.json(jsonObj),
    reason => res.status(500).send(reason),
  ));

export default dataRouter;
