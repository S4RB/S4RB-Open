export default class CpmuController {
  static get $inject() {
    return ['$scope', 'cpmuService'];
  }

  constructor($scope, cpmuService) {
    this.$scope = $scope;
    this.cpmuService = cpmuService;
    this.aggregationType = 'month';

    this.cpmuData = [];
    this.$onInit = () => this.getData();

    this.getData = this.getData.bind(this);
  }

  getData() {
    this.cpmuService
      .getCpmuData(this.aggregationType)
      .then((response) => {
        this.cpmuData = response.data;
      });
  }

  get aggregationLabel() {
    return this.aggregationType === 'quarter' ? 'Quarter' : 'Month';
  }
}
