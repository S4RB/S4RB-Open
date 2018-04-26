import * as chai  from 'chai';
import chaiHttp = require("chai-http");
import ENV from '../ENV';

chai.use(chaiHttp);

import App from '../App';

it('Main page content', (done) => {
    chai.request(App)
        .get(ENV.version + '/')
        .end(function (err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            done();
        });
});