app.controller 'UsersController', ($scope, authService, userData) ->
    userData.getCurrentUser().then (data) ->
        $scope.user = data
        if data.type == "Organization"
            userData.getOrganizationProfile().then (data) ->
                $scope.user = data

