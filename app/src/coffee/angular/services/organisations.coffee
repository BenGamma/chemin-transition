app.factory "Organisations",  ($http, $q, appConfig, ipCookie ) ->
    getOrganizations: () ->
        deferred = $q.defer()
        $http({method: 'GET', url: appConfig.url('organizations')})
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise