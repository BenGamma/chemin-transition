app.controller 'registerController', ($scope, $modalInstance, authService, userData) ->
    $scope.cancel = ->
       authService.hideRegister() 

    $scope.login = (loginForm, user)->
        userData.register(user).then((result) ->
        (data) ->
            user.error = data.message
        )

