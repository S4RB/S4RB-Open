/**
 * Component that handles the get request for the CPMU data
 */
'use strict';

angular.module('cpmuCore').
    component('cpmuCore', {
        templateUrl: 'cpmu/core/core.template.html',
        controller: ['$http', '$scope', '$rootScope', '$routeParams', function CpmuCoreController($http, $scope, $rootScope, $routeParams){
            $rootScope.complaints = [];

            $scope.filter = $routeParams.filter;
            $scope.complaints = [];
            $scope.cpmu_by_month = {};
            $scope.cpmu_by_quarter = [];
            $scope.cpmuTitle = "";

            $http.get('http://localhost:3000/CPMU').
                then(function(response){
                    $scope.complaints = response.data;
                });
        }]
    });