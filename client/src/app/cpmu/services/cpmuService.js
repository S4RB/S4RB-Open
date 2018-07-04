export default class CpmuService {
  static get $inject() {
    return ['$http'];
  }

  constructor($http) {
    this.$http = $http;
  }

  getCpmuData(aggregationType) {
    return this.$http.get(`http://localhost:8000/data/cpmu/${aggregationType || ''}`);
  }
}
