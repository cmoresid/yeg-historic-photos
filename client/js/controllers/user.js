var myApp = angular.module('myApp');

myApp.controller('UserController', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('username');
}])
