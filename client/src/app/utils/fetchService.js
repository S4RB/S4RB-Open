import config from '../../config';

export default class FetchService {
  static get $inject() {
    return ['$http'];
  }

  constructor($http) {
    this.$http = $http;
    this.host = config.host;
  }

  get(url) {
    return this.$http.get(`${this.host}${url}`);
  }
}
