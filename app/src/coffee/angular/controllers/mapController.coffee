app.controller 'MapController', ($scope, leafletData, $modal, authService) ->
    $scope.open = (size) ->
        authService.showLogin()

