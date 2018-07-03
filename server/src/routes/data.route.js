import express from 'express';
import { getCpmuData, aggregateByQuarter } from '../services/cpmuService';
import { QUARTER } from '../utils/constants';

const dataRouter = express.Router();
dataRouter.get('/:aggregation((month|quarter))?', (req, res) => {
  getCpmuData()
    .then(
      (cpmuData) => {
        if (req.params.aggregation === QUARTER) {
          res.json(aggregateByQuarter(cpmuData));
        } else {
          res.json(cpmuData);
        }
      },
      reason => res.status(500).send(reason),
    );
});

export default dataRouter;
