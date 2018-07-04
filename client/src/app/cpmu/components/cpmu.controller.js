export default class CpmuController {
  static get $inject() {
    return ['$scope', 'cpmuService'];
  }

  constructor($scope, cpmuService) {
    this.$scope = $scope;
    this.cpmuService = cpmuService;

    this.cpmuData = [];
    this.$onInit = () => this.getData();
  }

  getData(aggregationType) {
    this.cpmuService
      .getCpmuData(aggregationType)
      .then((response) => {
        this.cpmuData = response.data;
      });
  }
}
