export default class CpmuService {
  static get $inject() {
    return ['fetchService'];
  }

  constructor(fetchService) {
    this.fetchService = fetchService;
  }

  getCpmuData(aggregationType) {
    return this.fetchService.get(`data/cpmu/${aggregationType || ''}`);
  }
}
