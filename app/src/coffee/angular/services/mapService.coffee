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
