app.controller 'homeController', ($scope, leafletData, authService, Organisations) ->
    
    $scope.open = (size) ->
        authService.showLogin()
        
    $scope.organisations = Organisations

    $scope.mapView =
        active: true
        template: 'partials/map.html'

    $scope.listView =
        active: false
        template: 'partials/list.html'

    $scope.showMapView = ->
        $scope.mapView.active = true
        $scope.listView.active = false

    $scope.showListView = ->
        $scope.listView.active = true
        $scope.mapView.active = false
