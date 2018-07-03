import angular from 'angular';

import '../style/app.css';
import appTemplate from './app.html';

const app = () => ({
  template: appTemplate,
  controller: 'AppCtrl',
  controllerAs: 'app',
});

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
