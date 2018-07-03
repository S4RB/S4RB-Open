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
    template: require('./report.component.html')
};
