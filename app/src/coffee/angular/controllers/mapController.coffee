app.controller 'mapController', ($scope, leafletData, $modal, authService) ->
    $scope.open = (size) ->
        authService.showLogin()

