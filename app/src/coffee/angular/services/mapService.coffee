app.service 'mapService', ($timeout) ->
    init: ->

    hasSkill: (filter)->
        @myLayer.setFilter (t) ->
            for skill in t.properties.skills
                if skill.name == filter
                    result = true
                    return true
            return result
    resetFilter: ->
        @myLayer.setFilter (t) ->
            return true
        @myLayer.eachLayer (layer) ->
            popupContent = "<div class='text-center popup'><strong>" + layer.feature.properties.name + "</strong>" + "<br><img src='" + layer.feature.avatar + "'><br>"
            angular.forEach layer.feature.properties.skills, (value) ->
                popupContent = popupContent + "<span class='tag'>" + value.name + "</span>"
            popupContent = popupContent + "</div>"
            layer.bindPopup  popupContent
            layer.on 'mouseover', (e) -> layer.openPopup()
            layer.on 'mouseout', (e) -> layer.closePopup()
            layer.on 'click', (e) ->
                $scope.showModal e
