app = angular.module('app', ['ui.router', 'leaflet-directive'])

app.config ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("map");

    $stateProvider
    .state 'map',
        url: "/",
        templateUrl: "partials/map.html",
        controller: "mapController"