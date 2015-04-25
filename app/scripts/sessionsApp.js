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
                //redirectTo: '/page/1',
                templateUrl: 'templates/session-list.html',
                controller: 'SessionsController'
            }).
            when('/phones/:phoneId', {
                //templateUrl: 'partials/phone-detail.html',
                //controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                //redirectTo: '/phones'
            });
    }]);