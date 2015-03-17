app.controller 'StructuresShowController', ($scope, $stateParams, Organisations) ->
    Organisations.getOrganization($stateParams.id).then (data) ->
        $scope.org = data
        

