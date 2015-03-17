app.controller 'SkillsController', ($scope, skillData, mapService, $timeout) ->
    $scope.movies = []
    $scope.placeholder = "Find Skills"
    $timeout () ->
        mapService.resetFilter()
    skillData.getSkills().then (skills)->
        for skill in skills
            $scope.movies.push(skill.name)
    $scope.filter = (data) ->
        mapService.hasSkill(data)
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
