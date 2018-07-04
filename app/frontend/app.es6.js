require('./reset.less');
require('./main.page.less')

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import MainCtrl from './main.ctrl.es6.js';
import appConfig from './config.es6.js';
import reportModule from './report/report.module.es6';

angular.module('app', [uiRouter, reportModule])
  .controller('MainCtrl', MainCtrl)
  .config(appConfig);
