/**
 * Created by eugene on 4/25/15.
 */

var sessionDirectives = angular.module('sessionDirectives', ['sessionsController']);

sessionDirectives.directive('sort', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/sort-part.html',
        controller: 'SessionsController'
    };
});

sessionDirectives.directive('paging', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/paging-part.html',
        controller: 'SessionsController',
        scope: {
            currentPage: '=page',
            'previousPage': '&onPrevHandler',
            'nextPage': '&onNextHandler'
        }
    };
});