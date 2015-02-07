var app;app=angular.module("app",["ui.router","leaflet-directive"]),app.config(["$stateProvider","$urlRouterProvider",function(t,e){return e.otherwise(function(t){var e;return e=t.get("$state"),e.go("map")}),t.state("map",{url:"/",templateUrl:"partials/map.html",controller:"mapController"})}]),app.controller("loginController",["$scope",function(){}]),app.controller("mapController",["$scope","leafletData",function(){}]),app.directive("map",["leafletData",function(){return{restrict:"E",link:function(){var t,e,r,a;return e=L.map("map",{center:"center"}).setView([48.8375,2.3291],14),r='<a href="http://openstreetmap.org">OpenStreetMap</a>',L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; "+r+" Contributors",minZoom:10}).addTo(e),t=function(t){var e,r,a,n,o;return e=t.getBounds(),o=e.getSouthWest(),n=e.getNorthEast(),a=n.lng-o.lng,r=n.lat-o.lat,new L.LatLng(o.lat+r*Math.random(),o.lng+a*Math.random())},a=new L.MarkerClusterGroup,a.initialize,a.addLayer(new L.Marker(t(e))),a.addLayer(new L.Marker(t(e))),a.addLayer(new L.Marker(t(e))),e.addLayer(a),e.on("click",function(t){var r;r=L.marker(t.latlng),markersList.push({latlng:t.latlng}),r.addTo(e)})}}}]);