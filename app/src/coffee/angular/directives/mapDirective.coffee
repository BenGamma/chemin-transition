app.directive 'map', (leafletData) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
        map = L.map('map',
            center: 'center'
        ).setView([48.8375, 2.3291], 14)
        
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; ' + mapLink + ' Contributors',
                minZoom: 10
        ).addTo(map)

        
        
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
        markers.initialize
        
        
        markers.addLayer new L.Marker getRandomLatLng map
        markers.addLayer new L.Marker getRandomLatLng map
        markers.addLayer new L.Marker getRandomLatLng map
        map.addLayer markers
        
        
        #angular.forEach markers, (marker) ->
        #    L.marker(marker.latlng).addTo map
        #    return
        
        map.on 'click', (e) ->
            marker = L.marker(e.latlng)
            markersList.push {latlng: e.latlng}
            marker.addTo map
            return