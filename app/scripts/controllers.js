/**
 * Created by eugene on 4/25/15.
 */

var sessionsControllers = angular.module('sessionsController', []);

sessionsControllers.controller('SessionsController', function ($scope, RunSession) {
    $scope.runSessions = RunSession.query().$promise.then(
        function( value ) {
            $scope.sessionsList = value.run_sessions;
        },
        function( error ){/*error*/}
    );

    //$scope.runSessions.then(function(data) {
    //    console.log(data);
    //})

})

sessionsControllers.controller('SortController', function ($scope, RunSession) {


});