/**
 * Created by eugene on 4/25/15.
 */

var sessionsApp = angular.module('sessionsApp', ['ngRoute',
    'sessionsServices',
    'sessionsController',
    'sessionDirectives']);

sessionsApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/session-list.html',
                controller: 'SessionsController'
            }).
            when('/page/:pageNum', {
                templateUrl: 'templates/session-list.html',
                controller: 'SessionsController'
            }).
            when('/page/:pageNum/details/:id', {
                templateUrl: 'templates/session-details.html',
                controller: 'SessionsDetailsController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);