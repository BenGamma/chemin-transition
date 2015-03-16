app = angular.module('app', ['ui.router', 'ipCookie', 'leaflet-directive', 'mm.foundation', 'ngAutocomplete', 'ngTagsInput', 'ngDropzone', 'autocomplete'])

app.run ($rootScope, $location, $state, authService, ipCookie) ->
    $rootScope.$on '$stateChangeStart', (ev, to, toParams, from, fromParams) ->
        $rootScope.isLogged = true
        unless ipCookie('token') || ipCookie('email')
            $rootScope.isLogged = false


app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("index.structures");

    $stateProvider
    .state 'index',
        url: "/map",
        resolve:
            organizations: (Organisations) ->
                Organisations.getOrganizations().then (organisations) ->
                    organisations
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

    .state 'index.structures',
        url: '/structures',
        views:
            "":
                templateUrl: 'partials/structures/index.html'
                controller: "StructuresController"
            "filter":
                templateUrl: 'partials/ui/filter.html',
                controller: "StructuresController"

    .state 'index.news',
        url: '/'
        templateUrl: 'partials/structures/index.html'

    .state 'index.skills',
        url: '/skills',
        views:
            "":
                templateUrl: 'partials/skills/index.html'
                controller: "SkillsController"
            "filter":
                templateUrl: 'partials/ui/filter.html',
                controller: "SkillsController"



    .state 'index.assets',
        url: '/assets'
        templateUrl: 'partials/structures/index.html'

    .state 'index.actors',
        url: '/actors'
        templateUrl: 'partials/structures/index.html'


    .state 'users',
        url: "/users",
        resolve:
            check: ($state, authService) ->
                authService.isAuthorize().then (data) ->
                    return authService.needsLogin = data
        views:
            "":
                template: "<div ui-view></div>",
            "navbar":
                templateUrl: 'partials/navbar.html',
                controller: "NavBarController"


    .state 'users.profile',
        url: "/profile"
        controller: 'UsersController'
        templateUrl: 'partials/users/profile.html'

    .state 'structures',
        url: "/structures",
        views:
            "":
                templateUrl: "partials/structures.html",
                controller: "StructuresController"
            "navbar":
                templateUrl: 'partials/navbar.html',
                controller: "NavBarController"

    .state 'structures.show',
        url: '/:id',
        templateUrl: "partials/structures/show.html"
        resolve:
            id: ($stateParams, Organisations) ->
                return $stateParams.id
        controller: "StructuresShowController"

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
