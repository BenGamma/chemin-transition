app.directive 'map', (leafletData, $timeout) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl) ->
            map = L.map('map',
                center: 'center'
            ).setView([48.8375, 2.3291], 14)
            mapLink = 
                '<a href="http://openstreetmap.org">OpenStreetMap</a>';
            L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '&copy; ' + mapLink + ' Contributors',
                    minZoom: 10
            ).addTo(map);