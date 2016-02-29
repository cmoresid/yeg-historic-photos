var yegPhotoApp = angular.module('yegPhotoApp', [
    'ui.router',
    'lbServices',
    'uiGmapgoogle-maps'
]);

yegPhotoApp.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
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
});
