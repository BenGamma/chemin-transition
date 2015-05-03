var app;app=angular.module("app",["ui.router","ipCookie","leaflet-directive","mm.foundation","ngAutocomplete","ngTagsInput","ngDropzone","autocomplete"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,t,r,n,o){return e.$on("$stateChangeStart",function(t,r,n,i,a){return e.isLogged=!0,o("token")||o("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,r){return t.otherwise(function(e,t){var r;return r=e.get("$state"),r.go("index.structures")}),e.state("index",{views:{"":{templateUrl:"partials/home.html",controller:"HomeController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}},resolve:{organisations:["Organisations",function(e){return e.getOrganisations().then(function(e){return e})}]},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("index.structures",{views:{"":{templateUrl:"partials/structures.html",controller:"StructuresController"},filter:{templateUrl:"partials/ui/filter.html",controller:"StructuresController"}}}).state("index.actors",{url:"/actors",templateUrl:"partials/structures/index.html"}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,t){return t.isAuthorize().then(function(e){return t.needsLogin=e})}]},views:{"":{template:"<div ui-view></div>"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("users.profile",{url:"/profile",controller:"UsersController",templateUrl:"partials/users/profile.html"}).state("index.invitation",{url:"/invitation/:id",controller:"RegisterController",onEnter:["authService","userData","$stateParams","$state","ipCookie",function(e,t,r,n,o){return o("token")?n.go("index"):void t.getInvitation(r.id).then(function(t){return t&&0!=t.enable?(e.setInvitation(t),void e.showRegister()):n.go("index")})}]}).state("structures",{url:"/structures",views:{"":{templateUrl:"partials/structures.html",controller:"StructuresController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}}}).state("structures.show",{url:"/:id",templateUrl:"partials/structures/show.html",resolve:{id:["$stateParams","Organisations",function(e,t){return e.id}]},controller:"StructuresShowController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"SkillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"AssetsController"})}]),app.controller("AssetsController",["$scope","leafletData",function(e,t){}]),app.controller("FilterController",["$scope","map",function(e,t){}]),app.controller("HomeController",["$scope","authService","organisations","Organisations","userData","skillData","$modal","appConfig","mapService","$timeout","$stateParams","$filter",function(e,t,r,n,o,i,a,s,u,l,c,f){e.organisations=r,l(function(){u.resetFilter()}),e.open=function(e){t.showLogin()},e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.closeModal=function(){this.modalInstance.dismiss("cancel")},e.showModal=function(t){var r;e.selected=t.target.feature.properties,r=a.open({templateUrl:"partials/modal.html",windowClass:"large",scope:e})},e.$on("toggleViewMode",function(t){e.listView.active=!e.listView.active,e.mapView.active=!e.mapView.active}),e.filterSkills=function(e){u.filterMarkers(e.name),u.fitMap()},e.$on("updateStructuresList",function(t,r){e.organisations=r})}]),app.controller("InvitationController",["$scope","authService","userData","$state","$stateParams",function(e,t,r,n,o){e.mail={},r.getCurrentUser().then(function(t){e.user=t,e.mail.from=t.email,e.mail.subject="Invitation",e.mail.type="Organization"}),e.cancel=function(){return t.hideInvitation()},e.sendMail=function(t,n){return t.$invalid?(e.error="Form invalide",!1):void r.sendInvitation(n).then(function(t){e.cancel()},function(e){console.log(e)})}}]),app.controller("LoginController",["$scope","$modalInstance","authService","userData","$state",function(e,t,r,n,o){e.cancel=function(){return console.log(t.windowClass),r.hideLogin()},e.login=function(e,t){e.$invalid||n.login(t).then(function(e){return r.setSession(e),o.go("index").then(function(){return r.hideLogin(),o.reload()})},function(e){return t.error=e})}}]),app.controller("MapController",["$scope","$modal","authService",function(e,t,r){e.open=function(e){}}]),app.controller("ModalController",["$scope","$modal",function(e,t){return e.items=["item1","item2","item3"],e.open=function(){var r;return r=t.open({templateUrl:"myModalContent.html",scope:e,resolve:{items:function(){return e.items}}}),r.result.then(function(t){e.selected=t},function(){return $log.info("Modal dismissed at: "+new Date)})}}]),app.controller("NavBarController",["$scope","$modal","authService","$state","$rootScope",function(e,t,r,n,o){$(document).foundation(),e.openLogin=function(){r.showLogin()},e.openRegister=function(){r.showRegister()},e.openInvitation=function(){r.showInvitation()},e.logout=function(){r.destroySession(),n.go("index").then(function(){n.reload()})},e.toggleViewMode=function(e){$(e.currentTarget).hasClass("active")||($(".top-bar-section button").removeClass("active"),$(e.currentTarget).addClass("active"),o.$broadcast("toggleViewMode"))}}]),app.controller("RegisterController",["$scope","authService","userData","$state","$stateParams",function(e,t,r,n,o){e.type=!1,e.autocomplete={},e.invitation=t.invitation,e.user=t.user,e.cancel=function(){return t.hideRegister()},e.register=function(o,i){t.setUserCoordinates(i,e.autocomplete),o.$invalid||r.create(i).then(function(e){r.login(i).then(function(e){t.setSession(e),n.go("index").then(function(){return t.hideRegister(),n.reload()})},function(e){return i.error=e})},function(e){return i.error="email Already use"})},e.typeChange=function(t){return e.type="Organization"===t.type?!1:!0}}]),app.controller("SkillsController",["$scope","skillData","mapService","$timeout",function(e,t,r,n){e.movies=[],e.placeholder="Find Skills",n(function(){return r.resetFilter()}),t.getSkills().then(function(t){var r,n,o,i;for(i=[],n=0,o=t.length;o>n;n++)r=t[n],i.push(e.movies.push(r.name));return i})}]),app.controller("StructuresController",["$scope","$stateParams","appConfig","mapService","Organisations","userData","skillData","$timeout","$filter","$rootScope",function(e,t,r,n,o,i,a,s,u,l){e.filteredStructures=[],e.filteredActors=[],e.filteredSkills=[],e.currentFilter=[],e.orgs=o.getOrganisations().then(function(t){angular.forEach(t,function(t,r){var n,o=t.geometry.coordinates;$.ajax({url:"http://maps.googleapis.com/maps/api/geocode/json?latlng="+o[1]+","+o[0]+"&sensor=true",success:function(r){r.results[0]&&angular.forEach(r.results[0].address_components,function(e){"locality"==e.types[0]&&(n=e.long_name)}),e.filteredStructures.push({name:t.properties.name,city:n,skills:t.properties.skills,id:t.id})}})})}),e.actors=i.getPersons().then(function(t){angular.forEach(t,function(t,r){e.filteredActors.push({name:t.fullName})})}),e.skills=a.getSkills().then(function(t){angular.forEach(t,function(t,r){e.filteredSkills.push({name:t.name})})}),e.filterSkills=function(t){e.currentFilter.push(t.name);var r=[];r=n.filterMarkers(e.currentFilter),l.$broadcast("updateStructuresList",r),n.fitMap(),e.searchText=t.name},e.removeFilter=function(t){e.currentFilter=_.without(e.currentFilter,t);var r=[];r=n.filterMarkers(e.currentFilter),l.$broadcast("updateStructuresList",r),n.fitMap()}}]),app.controller("StructuresShowController",["$scope","$stateParams","Organisations","appConfig","authService",function(e,t,r,n,o){e.domain=n.domain(),r.getOrganisation(t.id).then(function(t){console.log(t),e.org=t},function(n){r.getTechonmapDatas().then(function(r){var n=_.findWhere(r,{id:t.id});e.org=n})})}]),app.controller("UsersController",["$scope","authService","userData","skillData","Organisations","appConfig","$timeout","ipCookie",function(e,t,r,n,o,i,a,s){e.autocomplete={},e.alerts=[],e.closeAlert=function(t){return e.alerts.splice(t,1)},r.getCurrentUser().then(function(n){return e.user=n,t.user=n,e.setUpload(),e.setUploadCarousel(),angular.isDefined(n.image)&&(e.avatar=i.domain()+n.image),"Organization"===n.type?r.getOrganizationProfile().then(function(r){return t.getGeocode(r).then(function(t){return e.autocomplete.coordinates=t[0].formatted_address}),e.user=r}):void 0}),n.getSkills().then(function(t){return e.skills=t}),r.getPersons().then(function(t){return e.persons=t}),e.update=function(r,n){return console.log(n),r.$invalid?e.alerts.push({type:"alert-box warning radius",msg:"Invalid informations."}):(e.alerts.push({type:"alert-box success radius",msg:"Profile updated !"}),n=t.setUserCoordinates(n,e.autocomplete),o.update(n).then(function(e){})),a(function(){return e.closeAlert()},4e3)},e.loadSkills=function(t){return e.skills.filter(function(e){return e.name.toLowerCase().match(t.toLowerCase())})},e.loadPersons=function(t){return e.persons.filter(function(e){return e.fullName.toLowerCase().match(t.toLowerCase())})},e.addActor=function(e){return o.addActor(e,t.user).then(function(e){})},e.removeActor=function(e){return console.log(e),o.removeActor(e,t.user).then(function(e){})},e.setUpload=function(){e.dropzoneConfig={url:i.url("users/upload/image/"+t.user.id),maxFiles:1,dictDefaultMessage:"Drag your avatar profile here",init:function(){var e;return e={name:"test"},e={name:"avatar",size:12345},this.on("maxfilesexceeded",function(e){return this.removeAllFiles(),this.addFile(e)})}},e.eventHandlers={success:function(t,r){return e.avatar=r}}},e.setUploadCarousel=function(){console.log("Carousel"),e.dropzoneConfigCarousel={url:i.url("organizations/images/"),headers:{"X-token":s("token"),"X-email":s("email")},maxFiles:5,dictDefaultMessage:"Drag your images for carousel here",init:function(){thisDropzone=this;var e;e={name:"test2"},e={name:"carousel",size:12345},this.on("addedfile",function(e){var t=Dropzone.createElement("<button>Remove file</button>"),r=this;t.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),r.removeFile(e)}),e.previewElement.appendChild(t)}),this.on("removedfile",function(e){$.ajax({headers:{"X-token":s("token"),"X-email":s("email")},url:i.url("organizations/images/"+e.id),type:"DELETE",error:function(e){console.log(e.Message)}}),console.log(e)}),this.on("maxfilesexceeded",function(e){this.removeFile(e),console.log("limit")}),this.on("success",function(e,t){e.id=t._id}),$.each(t.user.images,function(e,t){var r={name:"carousel",id:t._id,size:12345};thisDropzone.emit("addedfile",r),thisDropzone.emit("thumbnail",r,i.domain().concat(t.url))})}},e.eventHandlersCarousel={success:function(t,r){return e.carousel=r}}}}]),app.directive("carousel",["$timeout","Organisations","$modal","appConfig",function(e,t,r,n){return{restrict:"A",link:function(t,r,n,o,i){e(function(){r.slick({dots:!0,infinite:!0,speed:500,fade:!0,cssEase:"linear"})},100)}}}]),app.directive("listenFocus",["$timeout",function(e){return{restrict:"A",controler:"HomeController",link:function(t,r,n,o,i){$(r).on("focusin keypress",function(){$(".searchTextResults").show()}),$(r).on("focusout",function(){e(function(){$(".searchTextResults").hide()},500)}),$(document).keyup(function(e){27==e.keyCode&&$(".searchTextResults").hide()})}}}]),app.directive("map",["Organisations","$modal","appConfig","mapService","$timeout",function(e,t,r,n,o){return{restrict:"E",controler:"HomeController",link:function(t,o,i,a,s){var u,l,c,f,p,d;$("#map").parents().height("100%"),L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",c=L.tileLayer("https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,{attribution:'<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'}),u=!1,l=L.mapbox.map("map","tonylucas.l5j344b8",{minZoom:3}),l.addLayer(c),u?l.locate({setView:!0,maxZoom:15}):l.setView([48.86,2.34],12),n.myLayer=L.mapbox.featureLayer().addTo(l),e.getOrganisations().then(function(t){for(p=0,d=t.length;d>p;p++)f=t[p],f.avatar=r.domain()+f.image,f.properties["marker-color"]="#f86767";n.myLayer.setGeoJSON(t),n.initMarkers(),e.getTechonmapDatas().then(function(e){for(p=0,d=e.length;d>p;p++)f=e[p],f.avatar=r.domain()+f.image,f.properties["marker-color"]="#f86767";n.myLayer.setGeoJSON(_.union(t,e)),n.initMarkers()})})}}}]),app.filter("searchFilter",function(){return function(e,t){for(var r=[],n=0;n<e.length;n++){var o=e[n];o.type==t&&r.push(o)}return r}}),app.filter("andFilter",function(){return function(e,t,r){if(angular.isDefined(t)&&t.length>0&&angular.isDefined(e)){for(var n=[],o=t.toString().toLowerCase().split(/\s+/),i="(?=.*"+o.join(")(?=.*")+")",a=t.toString().toLowerCase().replace(/\s+/g,"|"),s=new RegExp("AND"==r?i:a,"i"),u=0;u<e.length;u++)if(angular.isDefined(e[u].skills)){var l=[];if(angular.forEach(e[u].skills,function(e){l.push(e.name+" ")}),s.test(l+e[u].name+e[u].city)){var c=_.find(n,function(t){return t.name==e[u].name});angular.isUndefined(c)&&n.push(e[u])}}else s.test(e[u].name+e[u].city)&&n.push(e[u]);return n}}}),app.factory("appConfig",function(){var e;return e="/api",{url:function(t){return e+"/"+t},domain:function(){return"http://dev.lescheminsdelatransition.org"}}}),app.service("authService",["ipCookie","userData","$state","$modal","$q",function(e,t,r,n,o){return{user:{type:"Organization"},token:null,needsLogin:!1,invitation:{active:!1,type:"Person"},setInvitation:function(e){this.invitation=e,this.invitation.active=!0,this.user.email=e.email,this.user.type=e.type},setSession:function(t){return console.log(t),this.user=t,this.token=t.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var n;return n=this,this.needsLogin=!0,e("token")||e("mail")?t.checkUser().then(function(e){return this.needsLogin=!1},function(e){return 401===e?(n.destroySession(),r.go("index").then(function(){return r.reload()})):void 0}):r.go("index")},showLogin:function(e){return this.login=n.open({templateUrl:"partials/login.html",controller:"LoginController",windowClass:"tiny animated fadeInDown"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(e){return this.register=n.open({templateUrl:"partials/register.html",controller:"RegisterController",windowClass:"tiny animated fadeInDown"}),this.register.result.then(function(e){return $scope.selected=e})},showInvitation:function(e){this.invitation=n.open({templateUrl:"partials/invitation.html",controller:"InvitationController",windowClass:"tiny animated fadeInDown"}),this.invitation.result.then(function(e){$scope.selected=e})},hideInvitation:function(){return this.invitation.dismiss("cancel")},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){e.remove("token"),e.remove("email"),this.user={}},getGeocode:function(e){var t,r,n;return t=o.defer(),r=new google.maps.Geocoder,n=new google.maps.LatLng(parseFloat(e.coordinates[1]),parseFloat(e.coordinates[0])),r.geocode({latLng:n},function(e,r){return t.resolve(e)}),t.promise},setUserCoordinates:function(e,t){var r;return t.details&&(r=t.details.geometry.location,e.coordinates={lt:r.D,lg:r.k}),e}}}]),app.service("mapService",["$timeout",function(e){return{init:function(){},hasSkill:function(e){return this.myLayer.setFilter(function(t){var r,n,o,i,a;for(a=t.properties.skills,o=0,i=a.length;i>o;o++)if(n=a[o],n.name===e)return r=!0,!0;return r})},resetFilter:function(){},initMarkers:function(){var e=this;this.myLayer.eachLayer(function(t){var r="<div class='text-center popup'><a href='#structures/"+t.feature.id+"'>"+t.feature.properties.name+"</a></div>";t.bindPopup(r),t.on("click",function(e){t.openPopup()}),e.myLayer.addLayer(t)})},fitMap:function(){this.myLayer._map.fitBounds(this.myLayer.getBounds(),{maxZoom:15}),this.myLayer.eachLayer(function(e){e.bounce({duration:800,height:140})})},filterMarkers:function(e){var t=[],r=this;return this.myLayer.setFilter(0==e.length?function(e){return t.push(e),r.initMarkers(),!0}:function(n){var o=!1;return angular.forEach(n.properties.skills,function(r){angular.forEach(e,function(e){r.name===e&&(o=!0,t.push(n))})}),r.initMarkers(),o}),t}}}]),app.factory("Organisations",["$http","$q","appConfig","ipCookie","authService",function(e,t,r,n,o){return{getOrganisations:function(){var n;return n=t.defer(),e({method:"GET",url:r.url("organizations")}).success(function(e,t,r,o){return n.resolve(e)}).error(function(e,t,r,o){return n.reject(e)}),n.promise},getOrganisation:function(o){var i;return i=t.defer(),e({method:"GET",url:r.url("organizations/show/"+o),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return i.resolve(e)}).error(function(e,t,r,n){return i.reject(e)}),i.promise},addActor:function(o,i){var a;return a=t.defer(),e({method:"POST",url:r.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return a.resolve(e)}).error(function(e,t,r,n){return a.reject(e)}),a.promise},removeActor:function(o,i){var a;return a=t.defer(),e({method:"DELETE",url:r.url("organizations/actor/"+i.id+"/"+o.id),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return a.resolve(e)}).error(function(e,t,r,n){return a.reject(e)}),a.promise},update:function(i){var a;return a=t.defer(),e({method:"PUT",url:r.url("organizations/update/"+o.user.id),headers:{"X-token":n("token"),"X-email":n("email")},data:i}).success(function(e,t,r,n){return a.resolve(e)}).error(function(e,t,r,n){return a.reject(e)}),a.promise},getTechonmapDatas:function(){var n;return n=t.defer(),e({method:"GET",url:r.url("organizations/techonmapdatas/")}).success(function(e,t,r,o){return n.resolve(e)}).error(function(e,t,r,o){return n.reject(e)}),n.promise}}}]),app.factory("skillData",["$http","$q","appConfig","ipCookie",function(e,t,r,n){return{getSkills:function(){var n;return n=t.defer(),e({method:"GET",url:r.url("skills")}).success(function(e,t,r,o){return n.resolve(e)}).error(function(e,t,r,o){return n.reject(e)}),n.promise}}}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,t,r,n){return{login:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("sessions/login"),data:n}).success(function(e,t,r,n){return o.resolve(e)}).error(function(e,t,r,n){return o.reject(e)}),o.promise},getPersons:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("users/persons"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return o.resolve(e)}).error(function(e,t,r,n){return o.reject(e)}),o.promise},getOrganizationProfile:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("organizations/profile"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return o.resolve(e)}).error(function(e,t,r,n){return o.reject(e)}),o.promise},getCurrentUser:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return o.resolve(e)}).error(function(e,t,r,n){return o.reject(e)}),o.promise},checkUser:function(){var o;return o=t.defer(),e({method:"GET",url:r.url("sessions"),headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return o.resolve(t)}).error(function(e,t,r,n){return o.reject(t)}),o.promise},create:function(n){var o;return o=t.defer(),e({method:"POST",url:r.url("users"),data:n}).success(function(e,t,r,n){return o.resolve(t)}).error(function(e,t,r,n){return o.reject(t)}),o.promise},update:function(o){var i;return i=t.defer(),e({method:"PUT",url:r.url("users"),params:{id:o._id},data:o,headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return i.resolve(t)}).error(function(e,t,r,n){return i.reject(t)}),i.promise},"delete":function(n){var o;return o=t.defer(),e({method:"DELETE",url:r.url("users"),params:{id:user._id},data:user}).success(function(e,t,r,n){return o.resolve(t)}).error(function(e,t,r,n){return o.reject(t)}),o.promise},sendInvitation:function(o){var i;return i=t.defer(),e({method:"POST",url:r.url("users/invitation"),data:o,headers:{"X-token":n("token"),"X-email":n("email")}}).success(function(e,t,r,n){return i.resolve(e)}).error(function(e,t,r,n){return i.reject(e)}),i.promise},getInvitation:function(n){var o;return o=t.defer(),e({method:"GET",url:r.url("users/invitation/"+n)}).success(function(e,t,r,n){return o.resolve(e)}).error(function(e,t,r,n){return o.reject(e)}),o.promise},deleteImage:function(n){var o;return o=t.defer(),e({method:"DELETE",url:r.url("organizations/images/"+n)}).success(function(e,t,r,n){return o.resolve(t)}).error(function(e,t,r,n){return o.reject(t)}),o.promise}}}]);