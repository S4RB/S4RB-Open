import angular from 'angular';

import appComponent from './app.component';
import cpmuModule from './cpmu/cpmu.module';

import '../style/app.css';

export default angular.module('app', [cpmuModule])
  .component('app', appComponent)
  .name;
