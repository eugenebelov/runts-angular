/**
 * Created by eugene on 4/25/15.
 */

var sessionsServices = angular.module('sessionsServices', ['ngResource']);

sessionsServices.factory('RunSession', ['$resource', function($resource){
    return $resource('http://intense-bastion-3210.herokuapp.com/run_sessions', {}, {
        query: {
            method:'GET',
            params:{
                page: 'index'
            }
        }
    });
}]);

sessionsServices.factory('GetSessionDetails', ['$resource', function($resource) {
    return $resource('http://intense-bastion-3210.herokuapp.com/run_sessions/:sessionId', {sessionId: '@id'});
}]);
