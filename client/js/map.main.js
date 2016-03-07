import './map.vendor';

import MapController from './controllers/map'

let dependencies = ['ui.router', 'lbServices', 'ui-leaflet']

let mainModule = angular.module('yegPhotoApp', dependencies)
  .controller(MapController.name, MapController)
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('map', {
            url: "/map",
            templateUrl: "views/map.html",
            controller: "MapController"
          })
          .state('about', {
            url: "/about",
            templateUrl: "views/about.html"
          });

        $urlRouterProvider.otherwise("/map");
      }]);

export default mainModule;
