reportService.$inject = ['$location', 'dataService', 'reportConsts'];

export default reportService;

function reportService($location, dataService, reportConsts) {
    return {
        changeMode,
        getOptions
    }

    function getOptions() {
        return reportConsts;
    }

    function changeMode(option) {
        $location.path(option.url);
        return dataService.loadDataFromUrl(option.url);
    }
}
