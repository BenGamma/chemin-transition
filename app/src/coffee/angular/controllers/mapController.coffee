app.controller 'mapController', ($scope, leafletData, $modal, authService) ->
    if authService.needsLogin
        authService.showLogin(100)
    $scope.open = (size) ->
        authService.showLogin()