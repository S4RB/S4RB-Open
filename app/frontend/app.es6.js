require('./reset.less');
require('./main.page.less')

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import MainCtrl from './main.ctrl.es6.js';
import appConfig from './config.es6.js';
import dataService from './data.service.es6.js';
import reportComponent from './report/report.component.es6.js';

angular.module('app', [uiRouter])
  .service('dataService', dataService)
  .controller('MainCtrl', MainCtrl)
  .component('reportComponent', reportComponent)
  .config(appConfig);
