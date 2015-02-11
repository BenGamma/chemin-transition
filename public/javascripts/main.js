var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie"]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,r,t){return r.otherwise(function(e){var r;return r=e.get("$state"),r.go("map")}),t.html5Mode(!0),e.state("map",{url:"/",templateUrl:"partials/map.html",controller:"mapController"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,r){return r.isAuthorize()?void 0:(r.needsLogin=!0,e.go("map"))}]}}).state("users.profile",{url:"/profile"}).state("structures",{url:"/structures",templateUrl:"partials/structures.html",controller:"structuresController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"skillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"assetsController"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000",{url:function(r){return e+"/"+r}}}),app.controller("assetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData",function(e,r){return{user:{},token:null,isAuthorize:function(){return!e(token)||!e(mail),r.checkUser().then(function(e){return console.log(e)})}}}]),app.controller("loginController",["$scope",function(){}]),app.controller("mapController",["$scope","leafletData",function(){return $(document).foundation()}]),app.directive("map",["leafletData",function(){return{restrict:"E",link:function(){var e,r,t,o,n;return L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",t=L.tileLayer("https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,{attribution:'<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'}),r=L.map("map").addLayer(t).setView([51.505,-.09],13),e=function(e){var r,t,o,n,a;return r=e.getBounds(),a=r.getSouthWest(),n=r.getNorthEast(),o=n.lng-a.lng,t=n.lat-a.lat,new L.LatLng(a.lat+t*Math.random(),a.lng+o*Math.random())},n=function(){var t,o,n;for(o=new L.MarkerClusterGroup,t=n=0;300>=n;t=++n)o.addLayer(new L.Marker(e(r)));return r.addLayer(o)},o=function(e){return alert(e.message)},r.on("locationfound",n),r.on("locationerror",o)}}}]),app.controller("skillsController",["$scope","leafletData",function(){}]),app.controller("structuresController",["$scope","leafletData",function(){}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,r,t,o){return{login:function(o){var n;return n=r.defer(),e({method:"POST",url:t.url("sessions/login"),data:o}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise},checkUser:function(){var n;return n=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{token:o("token"),mail:o("mail")}}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise},create:function(o){var n;return n=r.defer(),e({method:"POST",url:t.url("users"),data:o}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise},update:function(o){var n;return n=r.defer(),e({method:"PUT",url:t.url("users"),params:{id:o._id},data:o}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise},"delete":function(){var o;return o=r.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise}}}]);
