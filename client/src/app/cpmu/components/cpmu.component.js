import CpmuController from './cpmu.controller';
import cpmuTemplate from './cpmu.tpl.html';

import './cpmu.css';

const cpmuComponent = {
  controllerAs: 'ctrl',
  controller: CpmuController,
  template: cpmuTemplate,
};

export default cpmuComponent;
