app.directive 'map', (leafletData) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
    
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
        
        mapboxTiles = L.tileLayer 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        }

        map = L.map('map')
        .addLayer mapboxTiles
        .locate {setView: true, maxZoom: 16}

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
        
        onLocationFound = (e) ->
            markers = new L.MarkerClusterGroup()
            for i in [0..150]
                markers.addLayer new L.Marker getRandomLatLng map
            map.addLayer markers
        
        onLocationError = (e) ->
            alert e.message
        

        map.on 'locationfound', onLocationFound
        map.on 'locationerror', onLocationError
        
        
        #angular.forEach markers, (marker) ->
        #    L.marker(marker.latlng).addTo map
        #    return
        
        #map.on 'click', (e) ->
        #    marker = L.marker(e.latlng)
        #    markersList.push {latlng: e.latlng}
        #    marker.addTo map
        #    return