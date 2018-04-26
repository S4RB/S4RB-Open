import * as chai  from 'chai';
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

import App from '../App';

it('Main page content', function(done) {
    chai.request(App)
        .get('/v1/')
        .end(function (err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});