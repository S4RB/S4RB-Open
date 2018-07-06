import angular from 'angular';

import appComponent from './app.component';
import cpmuModule from './cpmu/cpmu.module';
import utilsModule from './utils/utils.module';

import '../style/app.css';

export default angular.module('app', [cpmuModule, utilsModule])
  .component('app', appComponent)
  .name;
