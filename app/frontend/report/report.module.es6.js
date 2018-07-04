require('./report.component.less');

import angular from 'angular';

import reportComponent from './report.component.es6.js';
import reportService from './report.service.es6.js';
import reportConsts from './report.const.es6.js';
import dataService from './data.service.es6';
import spinnerModule from './spinner/spinner.module.es6.js';

const moduleName = 'reportModule';

angular.module(moduleName, [spinnerModule])
  .service('dataService', dataService)
  .service('reportService', reportService)
  .component('reportComponent', reportComponent)
  .constant('reportConsts', reportConsts);

export default moduleName;