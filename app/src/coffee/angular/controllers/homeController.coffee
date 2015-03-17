app.controller 'HomeController', ($scope, authService, organizations, $modal, appConfig, mapService, $timeout) ->
    $scope.organizations = organizations
    $timeout () ->
        mapService.resetFilter()
    $scope.open = (size) ->
        authService.showLogin()
    
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

    $scope.closeModal = ->
        @modalInstance.dismiss 'cancel'
        
    
    $scope.showModal = (e) ->
        $scope.selected = e.target.feature.properties
        modalInstance = $modal.open
            templateUrl: 'partials/modal.html'
            windowClass: 'large'
            scope: $scope
