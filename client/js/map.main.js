import './map.vendor';

import MapController from './controllers/map'

let dependencies = ['ui.router', 'lbServices', 'uiGmapgoogle-maps']

let mainModule = angular.module('yegPhotoApp', dependencies)
  .controller(MapController.name, MapController)
  .config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
      function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
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

        uiGmapGoogleMapApiProvider.configure({
          v: '3.23',
          libraries: 'geometry,visualization'
        });
      }]);

export default mainModule;
