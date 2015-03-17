app.controller 'StructuresShowController', ($scope, $stateParams, Organisations) ->
    Organisations.getOrganization($stateParams.id).then (data) ->
        console.log data

