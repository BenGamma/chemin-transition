app.directive 'map', ($timeout, Organisations, $modal, appConfig, mapService) ->
    restrict: "E",
    controler: "HomeController",
    link: (scope, element, attrs, ctrl, e) ->
        $('#map').parents().height('100%')
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'

        mapboxTiles = L.tileLayer 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken,
            attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        locate = false
        map = L.mapbox.map('map')
        map.addLayer mapboxTiles

        map.locate {setView: true, maxZoom: 10} if locate
        map.setView([48.8, 2.3], 10) if !locate  
        mapService.myLayer = L.mapbox.featureLayer().addTo map
        Organisations.getOrganizations().then (organizations) ->
            mapService.clusterGroup = new L.MarkerClusterGroup
                polygonOptions: 
                    fillColor: '#3887be'
                    color: '#3887be'
                    weight: 2
                    opacity: 1
                    fillOpacity: 0.3

            for org in organizations
                org.avatar =  appConfig.domain()+org.image
                org.properties['marker-color'] = '#f86767'

            mapService.myLayer.setGeoJSON organizations

            mapService.myLayer.eachLayer (layer) ->
                layer.bindPopup layer.feature.properties.name
                layer.on 'mouseover', (e) -> layer.openPopup()
                layer.on 'mouseout', (e) -> layer.closePopup()
                layer.on 'click', (e) ->
                    $scope.showModal e
                mapService.clusterGroup.addLayer layer
            map.addLayer mapService.clusterGroup
        
