import * as chai  from 'chai';
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

import App from '../App';

it('CPMU main router - monthly', function(done) {
    chai.request(App)
        .get('/v1/data/cpmu')
        .end(function (err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});

it('CPMU main router - quarterly', function(done) {
    chai.request(App)
        .get('/v1/data/cpmu?period=quarterly')
        .end(function (err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});