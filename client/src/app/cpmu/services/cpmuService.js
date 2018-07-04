export default class CpmuService {
  constructor() {
    this.cpmuData = [{
      month: 'January 2018',
      cpmu: 51.544,
    }, {
      month: 'February 2018',
      cpmu: 13.65844,
    }];
  }

  getCpmuData() {
    return this.cpmuData;
  }
}
