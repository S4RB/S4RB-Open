import { Router, Request, Response } from 'express';

class IndexRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }

    static getIndex(req: Request, res: Response) {
        res.status(200)
            .json({ msg: "Hello!" })
    }

    init() {
        this.router.get('/', IndexRouter.getIndex);
    }
}

const indexRouter = new IndexRouter();
indexRouter.init();

export default indexRouter.router;
