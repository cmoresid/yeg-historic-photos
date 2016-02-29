var yegPhotoApp = angular.module('yegPhotoApp');

yegPhotoApp.controller('MapController', ['$scope', 'Photo', 'uiGmapGoogleMapApi',
  function($scope, Photo, GoogleMapApi) {
    $scope.map = {
      center: {
        latitude: 53.542381,
        longitude: -113.498759
      },
      zoom: 14
    };

    $scope.options = {
      scrollwheel: false
    };

    $scope.onClick = function(marker, eventName, model) {
           console.log("Clicked!");
           model.show = !model.show;
    };

    GoogleMapApi.then(function(maps) {
      $scope.googleVersion = maps.version;
      maps.visualRefresh = true;

      $scope.photos = Photo.find({
          filter: { where: { creationYear: { neq: null } } }
        })
        .$promise
        .then(function(photos) {
          console.log('Photo count: ', photos.length);
          $scope.photos = photos;

          var markers = [];
          for (var i = 0; i < photos.length; i++) {
            markers.push({
              id: photos[i].id,
              show: false,
              imageTitle: photos[i].imageTitle,
              creationYear: photos[i].creationYear,
              imagePath: photos[i].imagePath,
              description: photos[i].description,
              latitude: photos[i].location.lat,
              longitude: photos[i].location.lng
            });
          }

          $scope.markers = markers;
        });
    });
  }
]);
