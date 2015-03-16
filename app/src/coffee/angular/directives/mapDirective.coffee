app.directive 'map', (leafletData, $timeout, Organisations, $modal, appConfig, mapService) ->
    restrict: "E",
    controler: "HomeController",
    link: (scope, element, attrs, ctrl, e) ->
        $('#map').parents().height('100%')
        
