var yegPhotoApp = angular.module('yegPhotoApp');

yegPhotoApp.controller('MapController', ['$scope', 'Photo',
    function($scope, Photo) {
        $scope.photos = Photo
            .find()
            .$promise
            .then(function(photos) {
                $scope.photos = photos;
            });
    }]);
