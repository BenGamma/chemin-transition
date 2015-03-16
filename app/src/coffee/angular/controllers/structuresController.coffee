app.controller 'StructuresController', ($scope, $stateParams, appConfig, mapService, Organisations) ->
    $scope.movies = []
    $scope.placeholder = "Find Structures"
    Organisations.getOrganizations().then (organizations)->
        for org in organizations
            $scope.movies.push(org.properties.name)
    $scope.filter = (data) ->
        mapService.myLayer.setFilter (t) ->
            if data == ""
                return true
            return t.properties.name == data
        mapService.clusterGroup.clearLayers()
        mapService.clusterGroup = new L.MarkerClusterGroup
            polygonOptions: 
                fillColor: '#3887be'
                color: '#3887be'
                weight: 2
                opacity: 1
                fillOpacity: 0.3
        mapService.myLayer.eachLayer (layer) ->
            layer.bindPopup layer.feature.properties.name
            layer.on 'mouseover', (e) -> layer.openPopup()
            layer.on 'mouseout', (e) -> layer.closePopup()
            layer.on 'click', (e) ->
                scope.showModal e
            mapService.clusterGroup.addLayer layer
        mapService.myLayer.addLayer mapService.clusterGroup

