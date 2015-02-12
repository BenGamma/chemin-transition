app.controller 'navBarController', ($scope, leafletData, $modal, authService) ->
    $(document).foundation()
    $scope.openLogin =  ->
        authService.showLogin()

    $scope.openRegister =  ->
        authService.showRegister()