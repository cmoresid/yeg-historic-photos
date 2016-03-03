class MapController {

  constructor($scope, Photo, GoogleMapApi) {
    this.$scope = $scope;
    this.Photo = Photo;
    this.GoogleMapApi = GoogleMapApi;

    this.initGoogleMapsOptions();
    this.initGoogleMapsEvents();
    this.initGoogleMapsMarkers();
  }

  initGoogleMapsOptions() {
    this.$scope.map = {
      center: {
        latitude: 53.542381,
        longitude: -113.498759
      },
      zoom: 14
    };

    this.$scope.options = {
      scrollwheel: false
    };
  }

  initGoogleMapsEvents() {
    this.$scope.onClick = function(marker, eventName, model) {
      model.show = !model.show;
    };
  }

  initGoogleMapsMarkers() {
    let self = this;

    this.GoogleMapApi.then(function(maps) {
      self.$scope.googleVersion = maps.version;
      maps.visualRefresh = true;

      self.$scope.photos = self.Photo.find({
          filter: {
            where: {
              creationYear: {
                neq: null
              }
            }
          }
        })
        .$promise
        .then(function(photos) {
          self.$scope.photos = photos;

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

          self.$scope.markers = markers;
        });
    });
  }

}

MapController.$inject = ['$scope', 'Photo', 'uiGmapGoogleMapApi'];

export default MapController;
