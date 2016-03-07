class MapController {

  constructor($scope, Photo) {
    this.$scope = $scope;
    this.$scope.markers = []
    this.Photo = Photo;

    this.initMap();
    this.initMarkers();
  }

  initMap() {
    this.$scope.center = {
      lat: 53.542381,
      lng: -113.498759,
      zoom: 14
    }

    this.$scope.layers = {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      },
      overlays: {
        realworld: {
          name: "Real world data",
          type: "markercluster",
          visible: true
        }
      }
    }
  }

  getPhotos() {
    return this.Photo.find({
        filter: {
          where: {
            creationYear: {
              neq: null
            }
          }
        }
      })
      .$promise;
  }

  initMarkers() {
    let self = this;

    self.getPhotos().then(function(photos) {
      var markers = [];

      for (var i = 0; i < photos.length; i++) {
        markers.push({
          id: photos[i].id,
          lat: photos[i].location.lat,
          lng: photos[i].location.lng,
          layer: 'realworld',
          message: `<div>
                      <h3 style="text-align: center">${photos[i].imageTitle}</h3>
                      <div style="text-align: center; margin-bottom: 15px">Year of Photo: ${photos[i].creationYear}</div>
                      <div style="margin: auto;"><img src="${photos[i].imagePath}"/></div>
                      <div style="margin-top: 15px; font-style: italic;">${photos[i].description}</div>
                    </div>`
        });
      }

      self.$scope.markers = markers;
    });
  }

}

MapController.$inject = ['$scope', 'Photo'];

export default MapController;
