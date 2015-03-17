app.factory 'skillData', ($http, $q, appConfig, ipCookie ) ->
    
    getSkills: () ->
        deferred = $q.defer()
        $http({method: 'GET', url: appConfig.url('skills') })
            .success (data, status, headers, config) ->
                deferred.resolve(data)
            .error (data, status, headers, config) ->
                deferred.reject(data)
        deferred.promise