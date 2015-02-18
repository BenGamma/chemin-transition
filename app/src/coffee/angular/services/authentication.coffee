app.service 'authService', (ipCookie, userData, $state, $modal) ->
    user: {},
    token: null,
    needsLogin: false,

    setSession: (user) ->
        @user = user
        @token = user.token

        ipCookie('token', @token, {expires: 21})
        ipCookie('email', @user.email, {expires: 21})

    isAuthorize:  ->
        self = @
        @needsLogin = true
        unless ipCookie('token') || ipCookie('mail')
            return $state.go('index')

        userData.checkUser().then( (result) ->
            @needsLogin = false
        (error) ->
            if error == 401
                self.destroySession()
                $state.go('index').then ->
                    $state.reload()
        )

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

    destroySession: ->
        ipCookie.remove('token')
        ipCookie.remove('email')




