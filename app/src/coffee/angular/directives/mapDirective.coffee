app.directive 'map', (leafletData) ->
    restrict: "E"
    link: (scope, element, attrs, ctrl, e) ->
        map = L.map('map',
            center: 'center'
        ).setView([48.8375, 2.3291], 14)
        
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; ' + mapLink + ' Contributors',
                minZoom: 10
        ).addTo(map)

        markers = [
            {
                latlng: {
                    lat: 48.836305918541605,
                    lng: 2.2945117950439453
                }
            },{
                latlng: {
                    lat: 48.836305918541605,
                    lng: 2.2945117950439453
                }
            },{
                latlng: {
                    lat: 48.833933079205224,
                    lng: 2.311077117919922
                }
            }
        ];
        
        angular.forEach markers, (marker) ->
            L.marker(marker.latlng).addTo map
            return
        
        map.on 'click', (e) ->
            marker = L.marker(e.latlng)
            markers.push {latlng: e.latlng}
            marker.addTo map
            return