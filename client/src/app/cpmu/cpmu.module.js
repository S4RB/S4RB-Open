import angular from 'angular';
import cpmuComponent from './components/cpmu.component';
import CpmuService from './services/cpmuService';

export default angular.module('cpmu', [])
  .component('cpmu', cpmuComponent)
  .service('cpmuService', CpmuService)
  .name;
