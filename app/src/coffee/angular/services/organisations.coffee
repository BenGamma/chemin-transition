app.factory "Organisations",  ($http, $q, appConfig, ipCookie, authService) ->
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

    addActor: (actor, organization) ->
        deferred = $q.defer()
        $http({method: 'POST', url: appConfig.url('organizations/actor/'+organization.id+'/'+actor.id+''), headers: {'X-token': ipCookie('token'), 'X-email': ipCookie('email')} })
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise

    removeActor: (actor, user) ->
        deferred = $q.defer()
        $http({method: 'DELETE', url: appConfig.url('organizations/actor/'+user.id+'/'+actor.id), headers: {'X-token': ipCookie('token'), 'X-email': ipCookie('email')} })
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise  
    update: (data) ->
        deferred = $q.defer()
        $http({method: 'PUT', url: appConfig.url('organizations/update/'+authService.user.id), headers: {'X-token': ipCookie('token'), 'X-email': ipCookie('email')}, data: data })
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise