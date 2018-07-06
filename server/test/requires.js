global.chai = require('chai');

global.assert = global.chai.assert;
global.sinon = require('sinon');

global.sinonChai = require('sinon-chai');

global.chai.use(global.sinonChai);
