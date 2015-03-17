app.factory 'appConfig', ->
    path = 'http://localhost:3000/api'
    url: (url) ->
        "#{path}/#{url}"
    domain: () ->
        "http://localhost:3000"
