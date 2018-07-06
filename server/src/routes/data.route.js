import express from 'express';
import { getCpmuDataByQuarter, getCpmuDataByMonth } from '../services/cpmuService';
import { QUARTER } from '../utils/constants';

const dataRouter = express.Router();
dataRouter.get('/:aggregation((month|quarter))?', (req, res) => {
  (req.params.aggregation === QUARTER
    ? getCpmuDataByQuarter()
    : getCpmuDataByMonth())
    .then(
      cpmuData => res.json(cpmuData),
      reason => res.status(500).send(reason),
    );
});

export default dataRouter;
