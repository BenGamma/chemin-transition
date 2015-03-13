app.factory "Organisations",  ($http, $q, appConfig, ipCookie ) ->
    getOrganizations: () ->
        deferred = $q.defer()
        $http({method: 'GET', url: appConfig.url('organizations')})
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise
    getOrganization: (id) ->
        deferred = $q.defer()
        $http({method: 'GET', url: appConfig.url('organizations/show/'+id), headers: {'X-token': ipCookie('token'), 'X-email': ipCookie('email')} })
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise