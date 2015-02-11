app = angular.module('app', ['ui.router', 'leaflet-directive','ipCookie'])

app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("map");


    $locationProvider.html5Mode true

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

    .state 'structures',
        url: "/structures",
        templateUrl: "partials/structures.html",
        controller: "structuresController"

    .state 'skills',
        url: "/skills",
        templateUrl: "partials/skills.html",
        controller: "skillsController"

    .state 'assets',
        url: "/assets",
        templateUrl: "partials/assets.html",
        controller: "assetsController"

    #.state 'actors',
    #    url: "/actors",
    #    templateUrl: "partials/actors.html",
    #    controller: "actorsController"
