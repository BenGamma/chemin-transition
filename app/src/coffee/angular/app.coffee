app = angular.module('app', ['ui.router'])

app.config ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise ($injector, $location) ->
        $state = $injector.get("$state");
        $state.go("state1");

    $stateProvider
    .state 'state1',
        url: "/state1",
        templateUrl: "partials/login.html"