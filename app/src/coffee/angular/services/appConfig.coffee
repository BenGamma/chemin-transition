app.factory 'appConfig', ->
    path = 'http://localhost:3000'
    url: (url) ->
        "#{path}/#{url}"
