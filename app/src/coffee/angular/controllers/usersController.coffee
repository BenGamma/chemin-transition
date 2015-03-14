app.controller 'UsersController', ($scope, authService, userData, skillData, Organisations, appConfig) ->
    $scope.autocomplete = {}
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'alert-box success radius', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.closeAlert = (index) ->
        $scope.alerts.splice(index, 1);

    userData.getCurrentUser().then (data) ->
        $scope.user = data
        authService.user = data;
        $scope.setUpload()
        $scope.avatar = appConfig.domain()+data.image
        if data.type == "Organization"
            userData.getOrganizationProfile().then (data) ->
                authService.getGeocode(data).then (result) ->
                    $scope.autocomplete.coordinates = result[0]["formatted_address"]
                $scope.user = data

    skillData.getSkills().then (data) ->
        $scope.skills = data

    userData.getPersons().then (data) ->
        $scope.persons = data;

    $scope.update = (form, user) ->
        unless form.$invalid
            user = authService.setUserCoordinates(user, $scope.autocomplete)
            Organisations.update(user).then (data) ->

    $scope.addActor = (actor) ->
        Organisations.addActor(actor, authService.user).then (data) ->
    $scope.removeActor = (actor) ->
        Organisations.removeActor(actor, authService.user).then (data) ->

    $scope.setUpload = () ->
        $scope.dropzoneConfig =
            url: appConfig.url('users/upload/image/'+authService.user.id),
            maxFiles:1,
            dictDefaultMessage: "Drag your avatar profile here",
            init: ->
                mockFile = {name: 'test'}
                mockFile = { name: "avatar", size: 12345 };
                @on "maxfilesexceeded", (file) ->
                    @removeAllFiles()
                    @addFile(file)

        $scope.eventHandlers =
            success: (file, response) ->
                $scope.avatar = response


