app.controller 'loginController', ($scope, $modalInstance, authService, userData) ->
    $scope.cancel = ->
       authService.hideLogin() 

    $scope.login = (loginForm, user)->
        userData.login(user).then((result) ->
        (data) ->
            user.error = data.message
        )


