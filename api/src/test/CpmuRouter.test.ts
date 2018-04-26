import * as chai  from 'chai';
import chaiHttp = require("chai-http");
import ENV from '../ENV';

chai.use(chaiHttp);

import App from '../App';

it('CPMU main router - monthly', (done) =>{
    chai.request(App)
        .get(ENV.version + '/data/cpmu')
        .end( (err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});

it('CPMU main router - quarterly', (done) => {
    chai.request(App)
        .get(ENV.version + '/data/cpmu?period=quarterly')
        .end( (err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});