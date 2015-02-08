app.service 'authService', (ipCookie, userData, $state, $modal) ->
    user: {},
    token: null,
    needsLogin: false,
    isAuthorize: () ->
        unless ipCookie('token') || ipCookie('mail')
            @needsLogin = true
            false

    showLogin: (size) ->
        modalInstance = $modal.open
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            size: size
        modalInstance.result.then (selectedItem) ->
            $scope.selected = selectedItem; 
        ->
            $log.info('Modal dismissed at: ' + new Date());



