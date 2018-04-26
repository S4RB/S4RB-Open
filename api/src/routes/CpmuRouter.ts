import { Router, Request, Response, NextFunction } from 'express';
import * as fileSystem from 'fs';
import { Converter } from "csvtojson";
import ENV from '../ENV';
import { Complain, ComplainQuarterResult, ComplainMonthlyResult } from '../types/ComplainTypes';
import CpmuService from '../shared/CpmuService';

class CpmuRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }

    private get(request: Request, response: Response, next: NextFunction): void {
        const converter = new Converter();
        const period: string = request.query.period;

        fileSystem
            .createReadStream(ENV.dirname + '/public/cpmu.csv')
            .on('error', (err: Error) => next(err))
            .pipe(converter);

        converter
            .on('end_parsed', (jsonArray: Complain[]) => {
                let json: (ComplainMonthlyResult[] | ComplainQuarterResult[]);

                json = period === 'quarterly' ? CpmuService.sortByQuarter(jsonArray) : CpmuService.sortByMonth(jsonArray);

                response
                    .status(200)
                    .json(json);
            });
    }

    init() {
        this.router.get('/', this.get)
    }
}

const cpmuRouter = new CpmuRouter();
cpmuRouter.init();

export default cpmuRouter.router;
