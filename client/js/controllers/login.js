var loginApp = angular.module('loginApp', []);

loginApp.factory('notification', function() {
  var humane = require('humane-js');
  humane.timeout = 5000;
  humane.clickToClose = true;
  return humane;
});

loginApp.controller('loginController', function($scope, $http, $window, notification) {
  $scope.email = '';
  $scope.password = '';

  function getFormData() {
    return { "email": $scope.email, "password": $scope.password };
  }

  $scope.login = function(isValid) {
    if (!isValid) {
      return false;
    }

    $http.post('/api/Users/login', getFormData())
      .then(function success(response) {
        $window.localStorage.setItem('api_token', response.data.id);
        $window.localStorage.setItem('username', $scope.email);
        $window.location.href = "./admin.html#/Photos/list";
      }, function error(response) {
        if (response.status == 401) {
          notification.log('Invalid email / password', { addnCls: 'humane-flatty-error' });
        } else {
          notification.log('An error has occurred', { addnCls: 'humane-flatty-error' });
        }
      });

    return false;
  }
});
