app.controller 'StructuresController', ($scope, $stateParams, appConfig, mapService, Organisations, $timeout) ->
    $scope.movies = []
    $scope.placeholder = "Find Structures"
    $timeout () ->
        mapService.resetFilter()
    Organisations.getOrganizations().then (organizations)->
        for org in organizations
            $scope.movies.push(org.properties.name)
    $scope.filter = (data) ->
        mapService.myLayer.setFilter (t) ->
            if data == ""
                return true
            return t.properties.name == data
        mapService.myLayer.eachLayer (layer) ->
            popupContent = "<div class='text-center popup'><strong>" + layer.feature.properties.name + "</strong>" + "<br><img src='" + layer.feature.avatar + "'><br>"
            angular.forEach layer.feature.properties.skills, (value) ->
                popupContent = popupContent + "<span class='tag'>" + value.name + "</span>"
            popupContent = popupContent + "</div>"
            layer.bindPopup  popupContent
            layer.on 'mouseover', (e) -> layer.openPopup()
            layer.on 'mouseout', (e) -> layer.closePopup()
            layer.on 'click', (e) ->
                $scope.showModal e

