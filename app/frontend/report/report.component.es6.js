export default {
    controller: ['reportService', function (reportService) {
        const $ctrl = this;
        $ctrl.changeMode = changeMode;
        $ctrl.options = reportService.getOptions();

        $ctrl.$onInit = function() {
            const fistOption = $ctrl.options[0];
            $ctrl.selectedOption = fistOption;
            $ctrl.changeMode(fistOption);
        };

        function changeMode(option) {
            $ctrl.loading = true;

            return reportService.changeMode(option)
                .then(x => new Promise(resolve => setTimeout(() => resolve(x), option.delay))) // delay just for show off
                .then((data) => {
                    $ctrl.loading = false;
                    $ctrl.tableData = data;
                });
        }
    }],
    template: require('./report.component.html')
};
