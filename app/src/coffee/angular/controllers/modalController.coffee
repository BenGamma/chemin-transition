app.controller 'ModalController', ($scope, $modal) ->
  $scope.items = [
    'item1'
    'item2'
    'item3'
  ]

  $scope.open = ->
    modalInstance = $modal.open(
      templateUrl: 'myModalContent.html'
      scope: $scope
      resolve: items: ->
        $scope.items
    )
    modalInstance.result.then ((selectedItem) ->
      $scope.selected = selectedItem
      return
    ), ->
      $log.info 'Modal dismissed at: ' + new Date