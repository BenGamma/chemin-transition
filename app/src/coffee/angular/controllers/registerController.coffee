app.controller 'RegisterController', ($scope, $modalInstance, authService, userData) ->
    $scope.cancel = ->
       authService.hideRegister() 

    $scope.register = (registerForm, user)->
        unless registerForm.$invalid
            userData.create(user).then((result) ->
                authService.hideRegister()
            (data) ->
                user.error = "email Already use"
            )