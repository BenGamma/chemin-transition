app.controller 'NavBarController', ($scope, $modal, authService, $state) ->
    $(document).foundation()
    $scope.openLogin =  ->
        authService.showLogin()

    $scope.openRegister =  ->
        authService.showRegister()

    $scope.logout =  ->
        console.log("go")
        authService.destroySession()
        $state.go('index').then ->
            $state.reload()