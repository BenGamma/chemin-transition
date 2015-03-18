<<<<<<< HEAD
var app;app=angular.module("app",["ui.router","ipCookie","leaflet-directive","mm.foundation","ngAutocomplete","ngTagsInput","ngDropzone","autocomplete"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,r,t,n,o){return e.$on("$stateChangeStart",function(){return e.isLogged=!0,o("token")||o("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,r){return r.otherwise(function(e){var r;return r=e.get("$state"),r.go("index.structures")}),e.state("index",{url:"/map",resolve:{organizations:["Organisations",function(e){return e.getOrganizations().then(function(e){return e})}]},views:{"":{templateUrl:"partials/home.html",controller:"HomeController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("index.structures",{url:"/structures",views:{"":{templateUrl:"partials/structures/index.html",controller:"StructuresController"},filter:{templateUrl:"partials/ui/filter.html",controller:"StructuresController"}}}).state("index.news",{url:"/",templateUrl:"partials/structures/index.html"}).state("index.skills",{url:"/skills",views:{"":{templateUrl:"partials/skills/index.html",controller:"SkillsController"},filter:{templateUrl:"partials/ui/filter.html",controller:"SkillsController"}}}).state("index.assets",{url:"/assets",templateUrl:"partials/structures/index.html"}).state("index.actors",{url:"/actors",templateUrl:"partials/structures/index.html"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,r){return r.isAuthorize().then(function(e){return r.needsLogin=e})}]},views:{"":{template:"<div ui-view></div>"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("users.profile",{url:"/profile",controller:"UsersController",templateUrl:"partials/users/profile.html"}).state("structures",{url:"/structures",views:{"":{templateUrl:"partials/structures.html",controller:"StructuresController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("structures.show",{url:"/:id",templateUrl:"partials/structures/show.html",resolve:{id:["$stateParams","Organisations",function(e){return e.id}]},controller:"StructuresShowController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"SkillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"AssetsController"})}]),app.factory("appConfig",function(){var e;return e="api",{url:function(r){return""+e+"/"+r},domain:function(){return"http://178.62.141.159"}}}),app.controller("AssetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData","$state","$modal","$q",function(e,r,t,n,o){return{user:{},token:null,needsLogin:!1,setSession:function(r){return this.user=r,this.token=r.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var n;return n=this,this.needsLogin=!0,e("token")||e("mail")?r.checkUser().then(function(){return this.needsLogin=!1},function(e){return 401===e?(n.destroySession(),t.go("index").then(function(){return t.reload()})):void 0}):t.go("index")},showLogin:function(){return this.login=n.open({templateUrl:"partials/login.html",controller:"LoginController",windowClass:"tiny"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(){return this.register=n.open({templateUrl:"partials/register.html",controller:"RegisterController",windowClass:"tiny"}),this.register.result.then(function(e){return $scope.selected=e})},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){return e.remove("token"),e.remove("email")},getGeocode:function(e){var r,t,n;return r=o.defer(),t=new google.maps.Geocoder,n=new google.maps.LatLng(parseFloat(e.coordinates[1]),parseFloat(e.coordinates[0])),t.geocode({latLng:n},function(e){return r.resolve(e)}),r.promise},setUserCoordinates:function(e,r){var t;return r.details&&(t=r.details.geometry.location,e.coordinates={lt:t.D,lg:t.k}),e}}}]),app.controller("FilterController",["$scope","map",function(e,r){return console.log(r)}]),app.controller("HomeController",["$scope","authService","organizations","$modal","appConfig","mapService","$timeout",function(e,r,t,n,o,i,s){return e.organizations=t,s(function(){return i.resetFilter()}),e.open=function(){return r.showLogin()},e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.showMapView=function(){return e.mapView.active=!0,e.listView.active=!1},e.showListView=function(){return e.listView.active=!0,e.mapView.active=!1},e.closeModal=function(){return this.modalInstance.dismiss("cancel")},e.showModal=function(r){var t;return e.selected=r.target.feature.properties,t=n.open({templateUrl:"partials/modal.html",windowClass:"large",scope:e})}}]),app.controller("LoginController",["$scope","$modalInstance","authService","userData","$state",function(e,r,t,n,o){return e.cancel=function(){return t.hideLogin()},e.login=function(e,r){return e.$invalid?void 0:n.login(r).then(function(e){return t.setSession(e),o.go("index").then(function(){return t.hideLogin(),o.reload()})},function(e){return r.error=e})}}]),app.controller("MapController",["$scope","$modal","authService",function(e){return e.open=function(){}}]),app.directive("map",["$timeout","Organisations","$modal","appConfig","mapService",function(e,r,t,n,o){return{restrict:"E",controler:"HomeController",link:function(e){var r,t,i,s,a,u,l;for($("#map").parents().height("100%"),L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",i=L.tileLayer("https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,{attribution:'<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'}),r=!1,t=L.mapbox.map("map"),t.addLayer(i),r&&t.locate({setView:!0,maxZoom:10}),r||t.setView([48.8,2.3],10),o.myLayer=L.mapbox.featureLayer().addTo(t),l=e.organizations,a=0,u=l.length;u>a;a++)s=l[a],s.avatar=n.domain()+s.image,s.properties["marker-color"]="#f86767";return o.myLayer.setGeoJSON(e.organizations),o.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)})})}}}]),app.service("mapService",["$timeout",function(){return{init:function(){},hasSkill:function(e){return this.myLayer.setFilter(function(r){var t,n,o,i,s;for(s=r.properties.skills,o=0,i=s.length;i>o;o++)if(n=s[o],n.name===e)return t=!0,!0;return t})},resetFilter:function(){return this.myLayer.setFilter(function(){return!0})}}}]),app.controller("ModalController",["$scope","$modal",function(e,r){return e.items=["item1","item2","item3"],e.open=function(){var t;return t=r.open({templateUrl:"myModalContent.html",scope:e,resolve:{items:function(){return e.items}}}),t.result.then(function(r){e.selected=r},function(){return $log.info("Modal dismissed at: "+new Date)})}}]),app.controller("NavBarController",["$scope","$modal","authService","$state",function(e,r,t,n){return $(document).foundation(),e.openLogin=function(){return t.showLogin()},e.openRegister=function(){return t.showRegister()},e.logout=function(){return console.log("go"),t.destroySession(),n.go("index").then(function(){return n.reload()})}}]),app.factory("Organisations",["$http","$q","appConfig","ipCookie","authService",function(e,r,t,n,o){return{getOrganizations:function(){var n;return n=r.defer(),e({method:"GET",url:t.url("organizations")}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise},getOrganization:function(o){var i;return i=r.defer(),e({method:"GET",url:t.url("organizations/show/"+o),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return i.resolve(e)}).error(function(e){return i.reject(e)}),i.promise},addActor:function(o,i){var s;return s=r.defer(),e({method:"POST",url:t.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return s.resolve(e)}).error(function(e){return s.reject(e)}),s.promise},removeActor:function(o,i){var s;return s=r.defer(),e({method:"DELETE",url:t.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return s.resolve(e)}).error(function(e){return s.reject(e)}),s.promise},update:function(i){var s;return s=r.defer(),e({method:"PUT",url:t.url("organizations/update/"+o.user.id),headers:{"X-token":n("token"),"X-email":n("email")},data:i}).success(function(e){return s.resolve(e)}).error(function(e){return s.reject(e)}),s.promise}}}]),app.controller("RegisterController",["$scope","$modalInstance","authService","userData",function(e,r,t,n){return e.type=!1,e.autocomplete={},e.cancel=function(){return t.hideRegister()},e.register=function(r,o){return t.setUserCoordinates(o,e.autocomplete),r.$invalid?void 0:n.create(o).then(function(){return t.hideRegister()},function(){return o.error="email Already use"})},e.typeChange=function(r){return e.type="Organization"===r.type?!1:!0}}]),app.controller("sideBarController",["$scope","leafletData","$modal","authService",function(e,r,t,n){return e.openLogin=function(){return n.showLogin()},e.openRegister=function(){return n.showRegister()}}]),app.factory("skillData",["$http","$q","appConfig","ipCookie",function(e,r,t){return{getSkills:function(){var n;return n=r.defer(),e({method:"GET",url:t.url("skills")}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise}}}]),app.controller("SkillsController",["$scope","skillData","mapService","$timeout",function(e,r,t,n){return e.movies=[],e.placeholder="Find Skills",n(function(){return t.resetFilter()}),r.getSkills().then(function(r){var t,n,o,i;for(i=[],n=0,o=r.length;o>n;n++)t=r[n],i.push(e.movies.push(t.name));return i}),e.filter=function(r){return t.hasSkill(r),t.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)})})}}]),app.controller("StructuresController",["$scope","$stateParams","appConfig","mapService","Organisations","$timeout",function(e,r,t,n,o,i){return e.movies=[],e.placeholder="Find Structures",i(function(){return n.resetFilter()}),o.getOrganizations().then(function(r){var t,n,o,i;for(i=[],n=0,o=r.length;o>n;n++)t=r[n],i.push(e.movies.push(t.properties.name));return i}),e.filter=function(r){return n.myLayer.setFilter(function(e){return""===r?!0:e.properties.name===r}),n.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)})})}}]),app.controller("StructuresShowController",["$scope","$stateParams","Organisations",function(e,r,t){return t.getOrganization(r.id).then(function(r){return e.org=r})}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,r,t,n){return{login:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("sessions/login"),data:n}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getPersons:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("users/persons"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getOrganizationProfile:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("organizations/profile"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getCurrentUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},checkUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},create:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("users"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},update:function(o){var i;return i=r.defer(),e({method:"PUT",url:t.url("users"),params:{id:o._id},data:o,headers:{token:n("token"),email:n("email")}}).success(function(e,r){return i.resolve(r)}).error(function(e,r){return i.reject(r)}),i.promise},"delete":function(){var n;return n=r.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise}}}]),app.controller("UsersController",["$scope","authService","userData","skillData","Organisations","appConfig","$timeout",function(e,r,t,n,o,i,s){return e.autocomplete={},e.alerts=[],e.closeAlert=function(r){return e.alerts.splice(r,1)},t.getCurrentUser().then(function(n){return e.user=n,r.user=n,e.setUpload(),angular.isDefined(n.image)&&(e.avatar=i.domain()+n.image),"Organization"===n.type?t.getOrganizationProfile().then(function(t){return r.getGeocode(t).then(function(r){return e.autocomplete.coordinates=r[0].formatted_address}),e.user=t}):void 0}),n.getSkills().then(function(r){return e.skills=r}),t.getPersons().then(function(r){return e.persons=r}),e.update=function(t,n){return t.$invalid?e.alerts.push({type:"alert-box warning radius",msg:"Invalid informations."}):(e.alerts.push({type:"alert-box success radius",msg:"Profile updated !"}),n=r.setUserCoordinates(n,e.autocomplete),o.update(n).then(function(){})),s(function(){return e.closeAlert()},4e3)},e.addActor=function(e){return o.addActor(e,r.user).then(function(){})},e.removeActor=function(e){return o.removeActor(e,r.user).then(function(){})},e.setUpload=function(){return e.dropzoneConfig={url:i.url("users/upload/image/"+r.user.id),maxFiles:1,dictDefaultMessage:"Drag your avatar profile here",init:function(){var e;return e={name:"test"},e={name:"avatar",size:12345},this.on("maxfilesexceeded",function(e){return this.removeAllFiles(),this.addFile(e)})}},e.eventHandlers={success:function(r,t){return e.avatar=t}}}}]);
=======
var app;app=angular.module("app",["ui.router","ipCookie","leaflet-directive","mm.foundation","ngAutocomplete","ngTagsInput","ngDropzone","autocomplete"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,r,t,n,o){return e.$on("$stateChangeStart",function(){return e.isLogged=!0,o("token")||o("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,r){return r.otherwise(function(e){var r;return r=e.get("$state"),r.go("index.structures")}),e.state("index",{url:"/map",resolve:{organizations:["Organisations",function(e){return e.getOrganizations().then(function(e){return e})}]},views:{"":{templateUrl:"partials/home.html",controller:"HomeController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("index.structures",{url:"/structures",views:{"":{templateUrl:"partials/structures/index.html",controller:"StructuresController"},filter:{templateUrl:"partials/ui/filter.html",controller:"StructuresController"}}}).state("index.news",{url:"/",templateUrl:"partials/structures/index.html"}).state("index.skills",{url:"/skills",views:{"":{templateUrl:"partials/skills/index.html",controller:"SkillsController"},filter:{templateUrl:"partials/ui/filter.html",controller:"SkillsController"}}}).state("index.assets",{url:"/assets",templateUrl:"partials/structures/index.html"}).state("index.actors",{url:"/actors",templateUrl:"partials/structures/index.html"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,r){return r.isAuthorize().then(function(e){return r.needsLogin=e})}]},views:{"":{template:"<div ui-view></div>"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("users.profile",{url:"/profile",controller:"UsersController",templateUrl:"partials/users/profile.html"}).state("structures",{url:"/structures",views:{"":{templateUrl:"partials/structures.html",controller:"StructuresController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("structures.show",{url:"/:id",templateUrl:"partials/structures/show.html",resolve:{id:["$stateParams","Organisations",function(e){return e.id}]},controller:"StructuresShowController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"SkillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"AssetsController"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000/api",{url:function(r){return""+e+"/"+r},domain:function(){return"http://localhost:3000"}}}),app.controller("AssetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData","$state","$modal","$q",function(e,r,t,n,o){return{user:{},token:null,needsLogin:!1,setSession:function(r){return this.user=r,this.token=r.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var n;return n=this,this.needsLogin=!0,e("token")||e("mail")?r.checkUser().then(function(){return this.needsLogin=!1},function(e){return 401===e?(n.destroySession(),t.go("index").then(function(){return t.reload()})):void 0}):t.go("index")},showLogin:function(){return this.login=n.open({templateUrl:"partials/login.html",controller:"LoginController",windowClass:"tiny"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(){return this.register=n.open({templateUrl:"partials/register.html",controller:"RegisterController",windowClass:"tiny"}),this.register.result.then(function(e){return $scope.selected=e})},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){return e.remove("token"),e.remove("email")},getGeocode:function(e){var r,t,n;return r=o.defer(),t=new google.maps.Geocoder,n=new google.maps.LatLng(parseFloat(e.coordinates[1]),parseFloat(e.coordinates[0])),t.geocode({latLng:n},function(e){return r.resolve(e)}),r.promise},setUserCoordinates:function(e,r){var t;return r.details&&(t=r.details.geometry.location,e.coordinates={lt:t.D,lg:t.k}),e}}}]),app.controller("FilterController",["$scope","map",function(e,r){return console.log(r)}]),app.controller("HomeController",["$scope","authService","organizations","$modal","appConfig","mapService","$timeout",function(e,r,t,n,o,i,a){return e.organizations=t,a(function(){return i.resetFilter()}),e.open=function(){return r.showLogin()},e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.showMapView=function(){return e.mapView.active=!0,e.listView.active=!1},e.showListView=function(){return e.listView.active=!0,e.mapView.active=!1},e.closeModal=function(){return this.modalInstance.dismiss("cancel")},e.showModal=function(r){var t;return e.selected=r.target.feature.properties,t=n.open({templateUrl:"partials/modal.html",windowClass:"large",scope:e})}}]),app.controller("LoginController",["$scope","$modalInstance","authService","userData","$state",function(e,r,t,n,o){return e.cancel=function(){return t.hideLogin()},e.login=function(e,r){return e.$invalid?void 0:n.login(r).then(function(e){return t.setSession(e),o.go("index").then(function(){return t.hideLogin(),o.reload()})},function(e){return r.error=e})}}]),app.controller("MapController",["$scope","$modal","authService",function(e){return e.open=function(){}}]),app.directive("map",["$timeout","Organisations","$modal","appConfig","mapService",function(e,r,t,n,o){return{restrict:"E",controler:"HomeController",link:function(e){var r,t,i,a,s,u,l;for($("#map").parents().height("100%"),L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",i=L.tileLayer("https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,{attribution:'<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'}),r=!1,t=L.mapbox.map("map"),t.addLayer(i),r&&t.locate({setView:!0,maxZoom:10}),r||t.setView([48.8,2.3],10),o.myLayer=L.mapbox.featureLayer().addTo(t),l=e.organizations,s=0,u=l.length;u>s;s++)a=l[s],a.avatar=n.domain()+a.image,a.properties["marker-color"]="#f86767";return o.myLayer.setGeoJSON(e.organizations),o.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)}),console.log(r),o.myLayer.addLayer(r)})}}}]),app.service("mapService",["$timeout",function(){return{init:function(){},hasSkill:function(e){return this.myLayer.setFilter(function(r){var t,n,o,i,a;for(a=r.properties.skills,o=0,i=a.length;i>o;o++)if(n=a[o],n.name===e)return t=!0,!0;return t})},resetFilter:function(){return this.myLayer.setFilter(function(){return!0}),this.myLayer.eachLayer(function(e){var r;return r="<div class='text-center popup'><strong>"+e.feature.properties.name+"</strong><br><img src='"+e.feature.avatar+"'><br>",angular.forEach(e.feature.properties.skills,function(e){return r=r+"<span class='tag'>"+e.name+"</span>"}),r+="</div>",e.bindPopup(r),e.on("mouseover",function(){return e.openPopup()}),e.on("mouseout",function(){return e.closePopup()}),e.on("click",function(e){return $scope.showModal(e)})})}}}]),app.controller("ModalController",["$scope","$modal",function(e,r){return e.items=["item1","item2","item3"],e.open=function(){var t;return t=r.open({templateUrl:"myModalContent.html",scope:e,resolve:{items:function(){return e.items}}}),t.result.then(function(r){e.selected=r},function(){return $log.info("Modal dismissed at: "+new Date)})}}]),app.controller("NavBarController",["$scope","$modal","authService","$state",function(e,r,t,n){return $(document).foundation(),e.openLogin=function(){return t.showLogin()},e.openRegister=function(){return t.showRegister()},e.logout=function(){return console.log("go"),t.destroySession(),n.go("index").then(function(){return n.reload()})}}]),app.factory("Organisations",["$http","$q","appConfig","ipCookie","authService",function(e,r,t,n,o){return{getOrganizations:function(){var n;return n=r.defer(),e({method:"GET",url:t.url("organizations")}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise},getOrganization:function(o){var i;return i=r.defer(),e({method:"GET",url:t.url("organizations/show/"+o),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return i.resolve(e)}).error(function(e){return i.reject(e)}),i.promise},addActor:function(o,i){var a;return a=r.defer(),e({method:"POST",url:t.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return a.resolve(e)}).error(function(e){return a.reject(e)}),a.promise},removeActor:function(o,i){var a;return a=r.defer(),e({method:"DELETE",url:t.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return a.resolve(e)}).error(function(e){return a.reject(e)}),a.promise},update:function(i){var a;return a=r.defer(),e({method:"PUT",url:t.url("organizations/update/"+o.user.id),headers:{"X-token":n("token"),"X-email":n("email")},data:i}).success(function(e){return a.resolve(e)}).error(function(e){return a.reject(e)}),a.promise}}}]),app.controller("RegisterController",["$scope","$modalInstance","authService","userData",function(e,r,t,n){return e.type=!1,e.autocomplete={},e.cancel=function(){return t.hideRegister()},e.register=function(r,o){return t.setUserCoordinates(o,e.autocomplete),r.$invalid?void 0:n.create(o).then(function(){return t.hideRegister()},function(){return o.error="email Already use"})},e.typeChange=function(r){return e.type="Organization"===r.type?!1:!0}}]),app.controller("sideBarController",["$scope","leafletData","$modal","authService",function(e,r,t,n){return e.openLogin=function(){return n.showLogin()},e.openRegister=function(){return n.showRegister()}}]),app.factory("skillData",["$http","$q","appConfig","ipCookie",function(e,r,t){return{getSkills:function(){var n;return n=r.defer(),e({method:"GET",url:t.url("skills")}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise}}}]),app.controller("SkillsController",["$scope","skillData","mapService","$timeout",function(e,r,t,n){return e.movies=[],e.placeholder="Find Skills",n(function(){return t.resetFilter()}),r.getSkills().then(function(r){var t,n,o,i;for(i=[],n=0,o=r.length;o>n;n++)t=r[n],i.push(e.movies.push(t.name));return i}),e.filter=function(r){return t.hasSkill(r),t.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)})})}}]),app.controller("StructuresController",["$scope","$stateParams","appConfig","mapService","Organisations","$timeout",function(e,r,t,n,o,i){return e.movies=[],e.placeholder="Find Structures",i(function(){return n.resetFilter()}),o.getOrganizations().then(function(r){var t,n,o,i;for(i=[],n=0,o=r.length;o>n;n++)t=r[n],i.push(e.movies.push(t.properties.name));return i}),e.filter=function(r){return n.myLayer.setFilter(function(e){return""===r?!0:e.properties.name===r}),n.myLayer.eachLayer(function(r){var t;return t="<div class='text-center popup'><strong>"+r.feature.properties.name+"</strong><br><img src='"+r.feature.avatar+"'><br>",angular.forEach(r.feature.properties.skills,function(e){return t=t+"<span class='tag'>"+e.name+"</span>"}),t+="</div>",r.bindPopup(t),r.on("mouseover",function(){return r.openPopup()}),r.on("mouseout",function(){return r.closePopup()}),r.on("click",function(r){return e.showModal(r)})})}}]),app.controller("StructuresShowController",["$scope","$stateParams","Organisations",function(e,r,t){return t.getOrganization(r.id).then(function(r){return e.org=r})}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,r,t,n){return{login:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("sessions/login"),data:n}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getPersons:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("users/persons"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getOrganizationProfile:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("organizations/profile"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},getCurrentUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e){return o.resolve(e)}).error(function(e){return o.reject(e)}),o.promise},checkUser:function(){var o;return o=r.defer(),e({method:"GET",url:t.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},create:function(n){var o;return o=r.defer(),e({method:"POST",url:t.url("users"),data:n}).success(function(e,r){return o.resolve(r)}).error(function(e,r){return o.reject(r)}),o.promise},update:function(o){var i;return i=r.defer(),e({method:"PUT",url:t.url("users"),params:{id:o._id},data:o,headers:{token:n("token"),email:n("email")}}).success(function(e,r){return i.resolve(r)}).error(function(e,r){return i.reject(r)}),i.promise},"delete":function(){var n;return n=r.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,r){return n.resolve(r)}).error(function(e,r){return n.reject(r)}),n.promise}}}]),app.controller("UsersController",["$scope","authService","userData","skillData","Organisations","appConfig","$timeout",function(e,r,t,n,o,i,a){return e.autocomplete={},e.alerts=[],e.closeAlert=function(r){return e.alerts.splice(r,1)},t.getCurrentUser().then(function(n){return e.user=n,r.user=n,e.setUpload(),angular.isDefined(n.image)&&(e.avatar=i.domain()+n.image),"Organization"===n.type?t.getOrganizationProfile().then(function(t){return r.getGeocode(t).then(function(r){return e.autocomplete.coordinates=r[0].formatted_address}),e.user=t}):void 0}),n.getSkills().then(function(r){return e.skills=r}),t.getPersons().then(function(r){return e.persons=r}),e.update=function(t,n){return t.$invalid?e.alerts.push({type:"alert-box warning radius",msg:"Invalid informations."}):(e.alerts.push({type:"alert-box success radius",msg:"Profile updated !"}),n=r.setUserCoordinates(n,e.autocomplete),o.update(n).then(function(){})),a(function(){return e.closeAlert()},4e3)},e.addActor=function(e){return o.addActor(e,r.user).then(function(){})},e.removeActor=function(e){return o.removeActor(e,r.user).then(function(){})},e.setUpload=function(){return e.dropzoneConfig={url:i.url("users/upload/image/"+r.user.id),maxFiles:1,dictDefaultMessage:"Drag your avatar profile here",init:function(){var e;return e={name:"test"},e={name:"avatar",size:12345},this.on("maxfilesexceeded",function(e){return this.removeAllFiles(),this.addFile(e)})}},e.eventHandlers={success:function(r,t){return e.avatar=t}}}}]);
>>>>>>> 7cbbacf1babe43ad8c12f2a3caaab6b3266da755
