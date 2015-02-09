app.controller 'loginController', ($scope, $modalInstance, authService, userData) ->
    $scope.cancel = ->
       authService.hideLogin() 

    $scope.login = (loginForm, user)->
        unless loginForm.$invalid
            userData.login(user).then((user) ->
                authService.setSession(user)

            (data) ->
                user.error = data
            )


