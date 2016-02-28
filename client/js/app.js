var yegPhotoApp = angular.module('yegPhotoApp', ['ui.router', 'lbServices']);

yegPhotoApp.config(function($stateProvider, $urlRouterProvider) {
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
});
