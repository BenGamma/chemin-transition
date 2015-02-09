app.controller 'registerController', ($scope, $modalInstance, authService, userData) ->
    $scope.cancel = ->
       authService.hideRegister() 

    $scope.register = (registerForm, user)->
        unless registerForm.$invalid
            userData.create(user).then((result) ->
                console.log(result)
            (data) ->
                user.error = data.message
            )