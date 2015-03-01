app.directive 'map', (leafletData, $timeout, Organisations) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
    
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
        
        mapboxTiles = L.tileLayer 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        }

        locate = false
        
        $('#map').parents().height('100%')
            
        map = L.map('map')
        map.addLayer mapboxTiles
        
        map.locate {setView: true, maxZoom: 10} if locate
        map.setView([48.8, 2.3], 10) if !locate  
        
        
        #getRandomLatLng = (map) ->  
        #    bounds = map.getBounds()
        #        
        #    southWest = bounds.getSouthWest()
        #    northEast = bounds.getNorthEast()
        #    lngSpan = northEast.lng - southWest.lng
        #    latSpan = northEast.lat - southWest.lat
        #    return new L.LatLng(
        #        southWest.lat + latSpan * Math.random()
        #        southWest.lng + lngSpan * Math.random()
        #    )
        
        ###
        # Filters markers
        # @params {c} id of tag
        # @params {markerSymbol} marker symboles
        ###
        filter = (markerSymbol) ->
            # document.getElementsByClassName('active') == ''
            # c.className = 'active'
            map.featureLayer.setFilter (f) ->
                f.properties['skills'] == markerSymbol
            if c.className is 'active'
                c.className = ''
            false
        
        onLocationFound = (e) ->
            markers = new L.MarkerClusterGroup()
            angular.forEach Organisations, (org) ->
                m = new L.Marker org.latlng, name: org.name
                markers.addLayer m
                m.on 'mouseover', onMarkerHover
            map.addLayer markers
            

        onMarkerHover = (e) ->
            m = e.target
            m.bindPopup("<strong>" + m.options.name + "</strong><br><img src='http://placehold.it/250x180'>").openPopup()
        
        
        onLocationError = (e) ->
            alert e.message
        
        map.on 'locationfound', onLocationFound
        map.on 'locationerror', onLocationError
        
        onLocationFound() if !locate

        filter('poterie')
