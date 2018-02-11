'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'cpmuCore'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.
        when('/', {
            template:
                '<h1>Reporting App</h1>\
                <a href="#!/cpmu">CPMU Dashboard</a>'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
