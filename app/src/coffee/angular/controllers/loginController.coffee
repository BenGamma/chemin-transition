app.controller 'LoginController', ($scope, $modalInstance, authService, userData, $state) ->
    $scope.cancel = ->
       authService.hideLogin() 

    $scope.login = (loginForm, user)->
        unless loginForm.$invalid
            userData.login(user).then((user) ->
                
                authService.setSession(user)
                $state.go('index').then ->
                    authService.hideLogin()
                    $state.reload()

            (data) ->
                user.error = data
            )


