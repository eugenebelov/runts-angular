/**
 * Created by eugene on 4/25/15.
 */

var sessionsControllers = angular.module('sessionsController', []);

sessionsControllers.controller('SessionsController', function ($scope, RunSession) {
    $scope.sessionsList = {};
    $scope.currentPage = 1;

    RunSession.query().$promise.then(
        function( value ) {
            $scope.sessionsList = value.run_sessions;
        },
        function( error ){/*error*/}
    );

    $scope.prevPageHandler = function() {
        if( $scope.currentPage > 1) $scope.currentPage--;
    };

    $scope.nextPageHandler = function() {
        $scope.currentPage++;
    }

});