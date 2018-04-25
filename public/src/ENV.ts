interface IENVConf {
    [propName: string] : {
        APIVersion: string
        baseUrl: string;
    }
}

const ENVCONIG: IENVConf = {
    development: {
        APIVersion: 'v1',
        baseUrl: 'http://localhost:8000/'
    },
    production: {
        APIVersion: 'v1',
        baseUrl: 'http://localhost:8000/'
    },
    staging: {
        APIVersion: 'v1',
        baseUrl: 'http://localhost:8000/'
    }
};

const ENV = ENVCONIG[null || 'development']; // TODO
export default ENV;