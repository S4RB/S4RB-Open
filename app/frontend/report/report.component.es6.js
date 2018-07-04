require('./report.component.less');

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
                id: 0,
                label: 'Months',
                url: '/data/cpmu'
            },{
                id: 1,
                label: 'Quarter',
                url: '/data/cpmu?agregate=quarter'
            },{
                id: 2,
                label: 'Year',
                url: '/data/cpmu?agregate=year'
            }];
        };
    }],
    template: require('./report.component.html')
};
