reportService.$inject = ['dataService', 'reportConsts'];

export default reportService;

function reportService(dataService, reportConsts) {
    return {
        changeMode,
        getOptions
    }

    function getOptions() {
        return reportConsts;
    }

    function changeMode(option) {
        return dataService.loadDataFromUrl(option.url);
    }
}
