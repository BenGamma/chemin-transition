app.controller 'HomeController', ($scope, leafletData, authService, Organisations, $modal) ->
    
    $scope.open = (size) ->
        authService.showLogin()
        
    $scope.organisations = Organisations
    
    $scope.mapView =
        active: true
        template: 'partials/map.html'

    $scope.listView =
        active: false
        template: 'partials/list.html'

    $scope.showMapView = ->
        $scope.mapView.active = true
        $scope.listView.active = false

    $scope.showListView = ->
        $scope.listView.active = true
        $scope.mapView.active = false
        
        
    
    $scope.showModal = (e) ->
            $scope.selected = e.target.feature.properties
            modalInstance = $modal.open
                templateUrl: 'partials/modal.html'
                windowClass: 'large'
                scope: $scope
                
    
    $('#map').parents().height('100%')
    
    L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw'
    
    angular.extend $scope, defaults:
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

        for org in Organisations
            org.properties['marker-color'] = '#f86767'

        myLayer.setGeoJSON Organisations

        myLayer.eachLayer (layer) ->
            layer.bindPopup layer.feature.properties.name
            layer.on 'mouseover', (e) -> layer.openPopup()
            layer.on 'mouseout', (e) -> layer.closePopup()
            layer.on 'click', (e) ->
                $scope.showModal e
            clusterGroup.addLayer layer


        map.addLayer clusterGroup           