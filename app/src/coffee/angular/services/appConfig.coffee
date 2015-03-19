app.factory 'appConfig', ->
    path = 'http://178.62.141.159/api'
    url: (url) ->
        "#{path}/#{url}"
    domain: () ->
        "http://178.62.141.159"
