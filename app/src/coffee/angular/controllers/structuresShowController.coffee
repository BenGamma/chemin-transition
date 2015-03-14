app.controller 'StructuresShowController', ($scope, leafletData, $stateParams, Organisations) ->
    Organisations.getOrganization($stateParams.id).then (data) ->
        console.log data

