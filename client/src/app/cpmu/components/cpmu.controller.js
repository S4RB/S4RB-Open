export default class CpmuController {
  static get $inject() {
    return ['cpmuService'];
  }

  constructor(cpmuService) {
    this.cpmuData = cpmuService.getCpmuData();
  }
}
