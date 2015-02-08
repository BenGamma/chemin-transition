app.controller 'sideBarController', ($scope, leafletData, $modal, authService) ->
    $scope.openLogin =  ->
        authService.showLogin()

    $scope.openRegister =  ->
        authService.showRegister()