app = angular.module('app', ['ui.router', 'leaflet-directive','ipCookie', 'mm.foundation'])

app.config ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("index");

    $stateProvider
    .state 'index',
        url: "/",
        views:
            "":
                templateUrl: "partials/map.html",
                controller: "mapController"
            "sidebar":
                templateUrl: 'partials/sidebar.html',
                controller: "sideBarController"

        onEnter: (authService)->
            if authService.needsLogin
                authService.showLogin()

    .state 'users',
        url: "/users",
        resolve:
            check: ($state, authService) ->
                authService.isAuthorize()


    .state 'users.profile',
        url: "/profile"