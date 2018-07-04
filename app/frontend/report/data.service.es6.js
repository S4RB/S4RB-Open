dataService.$inject = ['$http', '$q'];

function dataService($http, $q) {
    return {
        loadDataFromUrl: function(url) {
            return $http.get(url)
                .then(function(response){ return response.data; });
        }
    };
};

export default dataService;