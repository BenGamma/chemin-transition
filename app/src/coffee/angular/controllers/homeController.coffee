app.controller 'homeController', ($scope, leafletData, $modal, authService, Organisations) ->
    $scope.open = (size) ->
        authService.showLogin()
        
    $scope.organisations = Organisations

    $scope.mapView =
        active: false
        template: 'partials/map.html'

    $scope.listView =
        active: true
        template: 'partials/list.html'

    $scope.showMapView = ->
        $scope.mapView.active = true
        $scope.listView.active = false

    $scope.showListView = ->
        $scope.listView.active = true
        $scope.mapView.active = false
