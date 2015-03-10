app = angular.module('app', ['ui.router', 'leaflet-directive','ipCookie', 'mm.foundation'])

app.run ($rootScope, $location, $state, authService, ipCookie) ->
    $rootScope.$on '$stateChangeStart', (ev, to, toParams, from, fromParams) ->
        $rootScope.isLogged = true
        unless ipCookie('token') || ipCookie('email')
            $rootScope.isLogged = false


app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("index");

    $stateProvider
    .state 'index',
        url: "/",
        views:
            "":
                templateUrl: "partials/home.html",
                controller: "HomeController"
            "navbar":
                templateUrl: 'partials/navbar.html',
                controller: "NavBarController"

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

    .state 'structures',
        url: "/structures",
        templateUrl: "partials/structures.html",
        controller: "StructuresController"

    .state 'skills',
        url: "/skills",
        templateUrl: "partials/skills.html",
        controller: "SkillsController"

    .state 'assets',
        url: "/assets",
        templateUrl: "partials/assets.html",
        controller: "AssetsController"

    #.state 'actors',
    #    url: "/actors",
    #    templateUrl: "partials/actors.html",
    #    controller: "actorsController"
