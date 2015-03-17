app.service 'authService', (ipCookie, userData, $state, $modal, $q) ->
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

    showLogin: (size) ->
        @login = $modal.open
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
            windowClass: 'tiny'

        @login.result.then (selectedItem) ->
            $scope.selected = selectedItem;

    hideLogin: ->
        @login.dismiss('cancel');

    showRegister: (size) ->
        @register = $modal.open
            templateUrl: 'partials/register.html',
            controller: 'RegisterController'
            windowClass: 'tiny'
        @register.result.then (selectedItem) ->
            $scope.selected = selectedItem

    hideRegister: ->
        @register.dismiss('cancel');

    destroySession: ->
        ipCookie.remove('token')
        ipCookie.remove('email')

    getGeocode: (data) ->
        deferred = $q.defer()
        geocoder = new google.maps.Geocoder();
        latlng   = new google.maps.LatLng(parseFloat(data.coordinates[1]), parseFloat(data.coordinates[0]))
        geocoder.geocode {'latLng': latlng}, (results, status) ->
            deferred.resolve(results)
        deferred.promise

    setUserCoordinates: (user, data) ->
        if data.details
            coordinates = data.details.geometry.location
            user.coordinates =
                lt: coordinates.D
                lg: coordinates.k
        user




