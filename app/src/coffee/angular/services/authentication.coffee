app.service 'authService', (ipCookie, userData, $state, $modal) ->
    user: {},
    token: null,
    needsLogin: false,
    isAuthorize:  ->
        unless ipCookie('token') || ipCookie('mail')
            @needsLogin = true
            $state.go('index')

    showLogin: ->
        @login = $modal.open
            templateUrl: 'partials/login.html',
            controller: 'loginController'

        @login.result.then (selectedItem) ->
            $scope.selected = selectedItem;

    hideLogin: ->
        @login.dismiss('cancel');

    showRegister: (size) ->
        @register = $modal.open
            templateUrl: 'partials/register.html',
            controller: 'registerController'
        @register.result.then (selectedItem) ->
            $scope.selected = selectedItem

    hideRegister: ->
        @register.dismiss('cancel');



