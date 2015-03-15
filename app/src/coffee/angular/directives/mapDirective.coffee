app.directive 'map', (leafletData, $timeout, Organisations, $modal, appConfig) ->
    restrict: "E",
    controler: "HomeController",
    link: (scope, element, attrs, ctrl, e) ->
        $('#map').parents().height('100%')
        
        L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
        
        angular.extend scope, defaults:
            tileLayer: 'https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken
            locate: true
            path:
                weight: 10
                color: '#800000'
                opacity: 1
            center: 
                lat: 48.8
                lng: 2.3
                zoom: 10
                
        leafletData.getMap('map').then (map) ->        
            
            clusterGroup = new L.MarkerClusterGroup
                polygonOptions: 
                    fillColor: '#3887be'
                    color: '#3887be'
                    weight: 2
                    opacity: 1
                    fillOpacity: 0.3


            myLayer = L.mapbox.featureLayer()
            
            for org in scope.organizations
                org.avatar =  appConfig.domain()+org.image
                org.properties['marker-color'] = '#f86767'

            myLayer.setGeoJSON scope.organizations
            ###
            myLayer.setFilter (t) ->
                if t.skills.length > 0 && t.skills[0].name == "découpeuse-laser"
                    return true
            ###

            myLayer.eachLayer (layer) ->
                layer.bindPopup layer.feature.properties.name
                layer.on 'mouseover', (e) -> layer.openPopup()
                layer.on 'mouseout', (e) -> layer.closePopup()
                layer.on 'click', (e) ->
                    scope.showModal e
                clusterGroup.addLayer layer


            map.addLayer clusterGroup 
