app.controller 'RegisterController', ($scope, $modalInstance, authService, userData) ->
    $scope.type = false
    $scope.autocomplete = {};
    $scope.cancel = ->
       authService.hideRegister() 

    $scope.register = (registerForm, user)->
        coordinates = $scope.autocomplete.details.geometry.location
        user.coordinates =
            lt: coordinates.D
            lg: coordinates.k

        unless registerForm.$invalid
            userData.create(user).then((result) ->
                authService.hideRegister()
            (data) ->
                user.error = "email Already use"
            )

    $scope.typeChange = (user) ->

       if user.type == "Organization"
            $scope.type = false
        else
            $scope.type = true

