import config from '../../../config';

export default class CpmuService {
  static get $inject() {
    return ['$http'];
  }

  constructor($http) {
    this.$http = $http;
  }

  getCpmuData(aggregationType) {
    return this.$http.get(`${config.host}data/cpmu/${aggregationType || ''}`);
  }
}
