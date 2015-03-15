app.directive 'map', (leafletData, $timeout, Organisations, $modal) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->