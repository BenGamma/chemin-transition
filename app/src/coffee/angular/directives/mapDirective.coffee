app.directive 'map', (leafletData) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
    
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
        L.mapbox.map('map', 'tonylucas.l5j344b8').setView([48.8375, 2.3291], 14)
        
        getRandomLatLng = (map) ->
            bounds = map.getBounds()
            southWest = bounds.getSouthWest()
            northEast = bounds.getNorthEast()
            lngSpan = northEast.lng - southWest.lng
            latSpan = northEast.lat - southWest.lat
            return new L.LatLng(
                southWest.lat + latSpan * Math.random()
                southWest.lng + lngSpan * Math.random()
            );
        
        
        markers = new L.MarkerClusterGroup()
        #markers.initialize
        
        
        
        
        #angular.forEach markers, (marker) ->
        #    L.marker(marker.latlng).addTo map
        #    return
        
        #map.on 'click', (e) ->
        #    marker = L.marker(e.latlng)
        #    markersList.push {latlng: e.latlng}
        #    marker.addTo map
        #    return