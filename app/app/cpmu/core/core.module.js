/**
 * Module for handling the CPMU REST API & display
 */
'use strict';

angular.module('cpmuCore', ['ngRoute'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.
        when('/cpmu', {
            template: '<cpmu-core></cpmu-core>'
        });
}]);