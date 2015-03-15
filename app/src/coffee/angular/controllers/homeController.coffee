app.controller 'HomeController', ($scope, leafletData, authService, organizations, $modal, appConfig) ->
    $scope.organizations = organizations
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
        
        
    
    $scope.showModal = (e) ->
            $scope.selected = e.target.feature.properties
            modalInstance = $modal.open
                templateUrl: 'partials/modal.html'
                windowClass: 'large'
                scope: $scope
                        