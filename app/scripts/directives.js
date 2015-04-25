/**
 * Created by eugene on 4/25/15.
 */

var sessionDirectives = angular.module('sessionDirectives', ['sessionsController']);

sessionDirectives.directive('sort', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/sort-part.html',
        controller: function ($scope, SavedSortingParams) {
            $scope.$watchGroup(['selectedSortOption', 'selectedSortOrderOption'], function(newValues, oldValues) {
                $scope.selectedSortOption = newValues[0];
                $scope.selectedSortOrderOption = newValues[1];

                if(newValues[0] != undefined) {
                    console.log("lolol", newValues)
                    SavedSortingParams.sort = newValues[0].value;
                    SavedSortingParams.order = newValues[1].value;
                }

            });
        }
    };
});

sessionDirectives.directive('paging', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/paging-part.html',
        scope: {
            currentPage: '=page',
            order: '=order',
            'previousPage': '&onPrevHandler',
            'nextPage': '&onNextHandler'
        }
    };
});