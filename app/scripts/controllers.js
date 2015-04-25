/**
 * Created by eugene on 4/25/15.
 */

var sessionsControllers = angular.module('sessionsController', []);

sessionsControllers.controller('SessionsController', function ($scope, $routeParams, $filter, RunSession, SavedSortingParams) {
    $scope.sessionsList = {};

    $scope.currentPage = ($routeParams.pageNum) ? $routeParams.pageNum : 1;
    $scope.sortOptionsOrderList = [
        {label: 'Descending', value: 'desc'},
        {label: 'Ascending', value: 'asc'}
    ];

    $scope.sortOptionsList = [
        { label: 'id', value: 'id' },
        { label: 'start time', value: 'start_time' },
        { label: 'end time', value: 'end_time' },
        { label: 'duration', value: 'duration' },
        { label: 'distance', value: 'distance' },
        { label: 'encoded trace', value: 'encoded_trace' },
        { label: 'sport type id', value: 'sport_type_id' }
    ];

    $scope.selectedSortOrderOption = $scope.sortOptionsOrderList[0];
    $scope.selectedSortOption = $scope.sortOptionsList[0];

    $scope.p = {page: $scope.currentPage};

    if(SavedSortingParams.sort != '') $scope.p['sort_by'] = SavedSortingParams.sort
    if(SavedSortingParams.order != '') $scope.p['order'] = SavedSortingParams.order

    RunSession.query($scope.p).$promise.then(
        function( value ) {
            $scope.sessionsList = value.run_sessions;

            $scope.selectedSortOrderOption = $filter('filter')($scope.sortOptionsOrderList, {
                value: value.meta.pagination.order
            })[0];

            $scope.selectedSortOption = $filter('filter')($scope.sortOptionsList, {
                value: value.meta.pagination.sort_by
            })[0];

            $scope.sessionsList.forEach(function(item) {
                item.start_time = $filter('date')(item.start_time, 'dd.MM.yyyy, HH.mm');
                item.end_time = $filter('date')(item.end_time, 'dd.MM.yyyy, HH.mm');
                item.hasTrace = (item.encoded_trace) ? true : false
            })
        },
        function( error ){/*error*/}
    );

    $scope.sortBy = function(sortingParam) {
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
                strokeWeight: 3
            });

            poly.setMap($scope.map)
        },
        function( error ){/*error*/}
    );


});