require('./spinner.component.less');

import angular from 'angular';

import spinnerComponent from './spinner.component.es6.js';

const moduleName = 'spinner';

angular.module(moduleName, [])
  .component('spinnerComponent', spinnerComponent);

export default moduleName;