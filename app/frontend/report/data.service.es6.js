dataService.$inject = ['$http'];

function dataService($http) {
    return {
        loadDataFromUrl: function(url) {
            return $http.get(url)
                .then((response) => response.data);
        }
    };
};

export default dataService;