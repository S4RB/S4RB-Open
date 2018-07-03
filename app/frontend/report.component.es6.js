export default {
    bindings: {
        mode: '=',
        data: '<'
    },
    controller: ['dataService', function (dataService) {
        this.changeMode = (option) => {
            dataService.loadDataFromUrl(option.url)
                .then((response) => {
                    this.state = response;
                });
            return option;
        }
        this.$onInit = function() {
            this.state = 'LOADING';
            this.options = [{
                id: 1,
                label: 'ALL',
                url: '/data/cpmu'
            }];
        };
    }],
    template: `
        <div>
            Mode: <select ng-model="selectedOption"
                ng-init="selectedOption = $ctrl.changeMode($ctrl.options[0])" 
                ng-options="option.label for option in $ctrl.options" 
                ng-change="$ctrl.changeMode(selectedOption)"></select>
        <div>
            {{ $ctrl.state }}
        </div>
    `
};
