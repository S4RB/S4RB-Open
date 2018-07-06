import angular from 'angular';
import FetchService from './fetchService';

export default angular.module('utils', [])
  .service('fetchService', FetchService)
  .name;
