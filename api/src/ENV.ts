import * as cors from 'cors';

interface IENVConf {
    [propName: string]: {
        dirname: string;
        version: string;
        host: string;
        cors: cors.CorsOptions;
    }
}
const ENVCONIG: IENVConf = {
    development: {
        dirname: __dirname,
        version: "/v1",
        host: "http://localhost:/",
        cors: {
            origin: ["http://localhost:3001"]
        }
    },
    staging: {
        dirname: __dirname,
        version: "/v1",
        host: "http://localhost:8000/",
        cors: {
            origin: ["http://localhost:3000"]
        }
    },
    production: {
        dirname: __dirname,
        version: "/v1",
        host: "http://localhost:8000/",
        cors: {
            origin: ["http://localhost:3000"]
        }
    }
};

const ENV = ENVCONIG[process.env.NODE_ENV || 'development'];
export default ENV;