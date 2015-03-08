var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie","mm.foundation"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,t,r,n,o){return e.$on("$stateChangeStart",function(){return e.isLogged=!0,o("token")||o("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t){return t.otherwise(function(e){var t;return t=e.get("$state"),t.go("index")}),e.state("index",{url:"/",views:{"":{templateUrl:"partials/home.html",controller:"homeController"},navbar:{templateUrl:"partials/navbar.html",controller:"navBarController"}},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,t){return t.isAuthorize()}]}}).state("users.profile",{url:"/profile"}).state("structures",{url:"/structures",templateUrl:"partials/structures.html",controller:"structuresController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"skillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"assetsController"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000/api",{url:function(t){return e+"/"+t}}}),app.controller("assetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData","$state","$modal",function(e,t,r,n){return{user:{},token:null,needsLogin:!1,setSession:function(t){return this.user=t,this.token=t.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var n;return n=this,this.needsLogin=!0,e("token")||e("mail")?t.checkUser().then(function(){return this.needsLogin=!1},function(e){return 401===e?(n.destroySession(),r.go("index").then(function(){return r.reload()})):void 0}):r.go("index")},showLogin:function(){return this.login=n.open({templateUrl:"partials/login.html",controller:"loginController"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(){return this.register=n.open({templateUrl:"partials/register.html",controller:"registerController"}),this.register.result.then(function(e){return $scope.selected=e})},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){return e.remove("token"),e.remove("email")}}}]),app.factory("Categories",function(){return[{name:"Info"},{name:"Cool"}]}),app.controller("homeController",["$scope","leafletData","$modal","authService","Organisations",function(e,t,r,n,o){return e.open=function(){return n.showLogin()},e.organisations=o,e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.showMapView=function(){return e.mapView.active=!0,e.listView.active=!1},e.showListView=function(){return e.listView.active=!0,e.mapView.active=!1}}]),app.controller("loginController",["$scope","$modalInstance","authService","userData","$state",function(e,t,r,n,o){return e.cancel=function(){return r.hideLogin()},e.login=function(e,t){return e.$invalid?void 0:n.login(t).then(function(e){return r.setSession(e),o.go("index").then(function(){return r.hideLogin(),o.reload()})},function(e){return t.error=e})}}]),app.controller("mapController",["$scope","leafletData","$modal","authService",function(e,t,r,n){return e.open=function(){return n.showLogin()}}]),app.directive("map",["leafletData","$timeout","Organisations",function(e,t,r){return{restrict:"E",link:function(){var e,t,n,o,i,a,s;return L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",o=L.tileLayer("https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,{attribution:'<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'}),t=!1,$("#map").parents().height("100%"),n=L.mapbox.map("map"),n.addLayer(o),t&&n.locate({setView:!0,maxZoom:10}),t||n.setView([48.8,2.3],10),i=L.mapbox.featureLayer().addTo(n),e=function(e){return L.mapbox.featureLayer(r).addTo(n).setFilter(function(t){return t.properties.skills.toString()===e}),!1},s=function(){var e;return e=new L.MarkerClusterGroup,L.mapbox.featureLayer(r).eachLayer(function(t){return t.feature.properties["marker-color"]="#f86767",e.addLayer(t),t.bindPopup(t.feature.properties.name)}),n.addLayer(e)},a=function(e){return alert(e.message)},n.on("locationfound",s),n.on("locationerror",a),t||s(),e("poterie")}}}]),app.controller("navBarController",["$scope","leafletData","$modal","authService","$state",function(e,t,r,n,o){return $(document).foundation(),e.openLogin=function(){return n.showLogin()},e.openRegister=function(){return n.showRegister()},e.logout=function(){return console.log("go"),n.destroySession(),o.go("index").then(function(){return o.reload()})}}]),app.directive("dropdownMultiselect",["Categories",function(){return{restrict:"E",scope:{model:"=",options:"=",pre_selected:"=preSelected"},template:"<div class='btn-group' ng-class='{open: open}'><button class='btn btn-small'>Select</button><button class='btn btn-small dropdown-toggle' ng-click='open=!open;openDropdown()'><span class='caret'></span></button><ul class='dropdown-menu' aria-labelledby='dropdownMenu'><li><a ng-click='selectAll()'><i class='fa fa-check'></i>  Check All</a></li><li><a ng-click='deselectAll();'><i class='fa fa-times'></i>  Uncheck All</a></li><li class='divider'></li><li ng-repeat='option in options'> <a ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></a></li></ul></div>"}}]),app.factory("Organisations",function(){return[{type:"Feature",properties:{email:"glovermercado@quantalia.com",phone:"O629356364",name:"Medalert",skills:["decoupe-laser"]},geometry:{type:"Point",coordinates:[2.28463846932982,48.56114736330009]}},{type:"Feature",properties:{email:"glovermercado@medalert.com",phone:"O603635438",name:"Vortexaco",skills:["poterie"]},geometry:{type:"Point",coordinates:[2.23699744072292,48.76141838911763]}}]}),app.controller("registerController",["$scope","$modalInstance","authService","userData",function(e,t,r,n){return e.cancel=function(){return r.hideRegister()},e.register=function(e,t){return console.log(t),e.$invalid?void 0:n.create(t).then(function(){return r.hideRegister()},function(){return t.error="email Already use"})}}]),app.factory("Skills",function(){return[{name:"potier"},{name:"guerrier"}]}),app.controller("skillsController",["$scope","leafletData",function(){}]),app.controller("structuresController",["$scope","leafletData",function(){}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,t,r,n){return{login:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("sessions/login"),data:n}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},checkUser:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t){return o.resolve(t)}).error(function(e,t){return o.reject(t)}),o.promise},create:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("users"),data:n}).success(function(e,t){return o.resolve(t)}).error(function(e,t){return o.reject(t)}),o.promise},update:function(o){var i;return i=t.defer(),e({method:"PUT",url:r.url("users"),params:{id:o._id},data:o,headers:{token:n("token"),email:n("email")}}).success(function(e,t){return i.resolve(t)}).error(function(e,t){return i.reject(t)}),i.promise},"delete":function(){var n;return n=t.defer(),e({method:"DELETE",url:r.url("users"),params:{id:user._id},data:user}).success(function(e,t){return n.resolve(t)}).error(function(e,t){return n.reject(t)}),n.promise}}}]);