app = angular.module('app', ['ui.router', 'leaflet-directive','ipCookie'])

app.config ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("map");

    $stateProvider
    .state 'map',
        url: "/",
        templateUrl: "partials/map.html",
        controller: "mapController"

    .state 'users',
        url: "/users",
        resolve:
            check: ($state, authService) ->
                unless authService.isAuthorize()
                    authService.needsLogin = true
                    $state.go('map')

    .state 'users.profile',
        url: "/profile"