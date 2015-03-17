app.factory 'appConfig', ->
    path = 'api'
    url: (url) ->
        "#{path}/#{url}"
    domain: () ->
        "http://178.62.141.159"
