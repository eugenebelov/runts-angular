/**
 * Created by eugene on 4/25/15.
 */

var sessionsControllers = angular.module('sessionsController', []);

sessionsControllers.controller('SessionsController', function ($scope, $routeParams, $filter, RunSession) {
    $scope.sessionsList = {};
    $scope.currentPage = ($routeParams.pageNum) ? $routeParams.pageNum : 1;

    RunSession.query({page: $scope.currentPage}).$promise.then(
        function( value ) {
            $scope.sessionsList = value.run_sessions;

            $scope.sessionsList.forEach(function(item) {
                item.start_time = $filter('date')(item.start_time, 'dd.MM.yyyy, HH.mm');
                item.end_time = $filter('date')(item.end_time, 'dd.MM.yyyy, HH.mm');
                item.hasTrace = (item.encoded_trace) ? true : false
            })
        },
        function( error ){/*error*/}
    );

    $scope.sortBy = function(sortingParam) {
        //console.log($scope.sessionsList);
        $scope.predicate = sortingParam;
    };

    $scope.prevPageHandler = function() {
        if( $scope.currentPage > 1) $scope.currentPage--;
    };

    $scope.nextPageHandler = function() {
        $scope.currentPage++;
    }

});

sessionsControllers.controller('SessionsDetailsController', function($scope, $routeParams, $filter, GetSessionDetails) {
    $scope.sessionsDetails = {};
    $scope.currentPage = $routeParams.pageNum;

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        libraries: ['google.maps.geometry']
    };

    GetSessionDetails.get({sessionId: $routeParams.id}).$promise.then(
        function( value ) {
            $scope.sessionsDetails = value.run_session;
            $scope.sessionsDetails.start_time = $filter('date')($scope.sessionsDetails.start_time, 'dd.MM.yyyy, HH.mm');
            $scope.sessionsDetails.end_time = $filter('date')($scope.sessionsDetails.end_time, 'dd.MM.yyyy, HH.mm');

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var path = google.maps.geometry.encoding.decodePath($scope.sessionsDetails.encoded_trace);

            $scope.map.setCenter(path[0]);

            var poly = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            poly.setMap($scope.map)
        },
        function( error ){/*error*/}
    );


});