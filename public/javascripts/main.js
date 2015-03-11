var app;app=angular.module("app",["ui.router","leaflet-directive","ipCookie","mm.foundation"]),app.run(["$rootScope","$location","$state","authService","ipCookie",function(e,o,t,r,n){return e.$on("$stateChangeStart",function(){return e.isLogged=!0,n("token")||n("email")?void 0:e.isLogged=!1})}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,o){return o.otherwise(function(e){var o;return o=e.get("$state"),o.go("index")}),e.state("index",{url:"/",views:{"":{templateUrl:"partials/home.html",controller:"HomeController"},navbar:{templateUrl:"partials/navbar.html",controller:"NavBarController"}},onEnter:["authService",function(e){return e.needsLogin?e.showLogin():void 0}]}).state("users",{url:"/users",resolve:{check:["$state","authService",function(e,o){return o.isAuthorize()}]}}).state("users.profile",{url:"/profile"}).state("structures",{url:"/structures",templateUrl:"partials/structures.html",controller:"StructuresController"}).state("skills",{url:"/skills",templateUrl:"partials/skills.html",controller:"SkillsController"}).state("assets",{url:"/assets",templateUrl:"partials/assets.html",controller:"AssetsController"})}]),app.factory("appConfig",function(){var e;return e="http://localhost:3000/api",{url:function(o){return e+"/"+o}}}),app.controller("AssetsController",["$scope","leafletData",function(){}]),app.service("authService",["ipCookie","userData","$state","$modal",function(e,o,t,r){return{user:{},token:null,needsLogin:!1,setSession:function(o){return this.user=o,this.token=o.token,e("token",this.token,{expires:21}),e("email",this.user.email,{expires:21})},isAuthorize:function(){var r;return r=this,this.needsLogin=!0,e("token")||e("mail")?o.checkUser().then(function(){return this.needsLogin=!1},function(e){return 401===e?(r.destroySession(),t.go("index").then(function(){return t.reload()})):void 0}):t.go("index")},showLogin:function(){return this.login=r.open({templateUrl:"partials/login.html",controller:"LoginController",windowClass:"tiny"}),this.login.result.then(function(e){return $scope.selected=e})},hideLogin:function(){return this.login.dismiss("cancel")},showRegister:function(){return this.register=r.open({templateUrl:"partials/register.html",controller:"RegisterController",windowClass:"tiny"}),this.register.result.then(function(e){return $scope.selected=e})},hideRegister:function(){return this.register.dismiss("cancel")},destroySession:function(){return e.remove("token"),e.remove("email")}}}]),app.controller("HomeController",["$scope","leafletData","authService","Organisations","$modal",function(e,o,t,r,n){return e.open=function(){return t.showLogin()},e.organisations=r,e.mapView={active:!0,template:"partials/map.html"},e.listView={active:!1,template:"partials/list.html"},e.showMapView=function(){return e.mapView.active=!0,e.listView.active=!1},e.showListView=function(){return e.listView.active=!0,e.mapView.active=!1},e.showModal=function(o){var t;return e.selected=o.target.feature.properties,t=n.open({templateUrl:"partials/modal.html",windowClass:"large",scope:e})},$("#map").parents().height("100%"),L.mapbox.accessToken="pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw",angular.extend(e,{defaults:{tileLayer:"https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token="+L.mapbox.accessToken,locate:!0,path:{weight:10,color:"#800000",opacity:1},center:{lat:48.8,lng:2.3,zoom:10}}}),o.getMap("map").then(function(o){var t,n,a,i,p;for(t=new L.MarkerClusterGroup({polygonOptions:{fillColor:"#3887be",color:"#3887be",weight:2,opacity:1,fillOpacity:.3}}),i=L.mapbox.featureLayer(),n=0,a=r.length;a>n;n++)p=r[n],p.properties["marker-color"]="#f86767";return i.setGeoJSON(r),i.eachLayer(function(o){return o.bindPopup(o.feature.properties.name),o.on("mouseover",function(){return o.openPopup()}),o.on("mouseout",function(){return o.closePopup()}),o.on("click",function(o){return e.showModal(o)}),t.addLayer(o)}),o.addLayer(t)})}]),app.controller("LoginController",["$scope","$modalInstance","authService","userData","$state",function(e,o,t,r,n){return e.cancel=function(){return t.hideLogin()},e.login=function(e,o){return e.$invalid?void 0:r.login(o).then(function(e){return console.log(e),t.setSession(e),n.go("index").then(function(){return t.hideLogin(),n.reload()})},function(e){return o.error=e})}}]),app.controller("MapController",["$scope","leafletData","$modal","authService",function(e,o,t,r){return e.open=function(){return r.showLogin()}}]),app.directive("map",["leafletData","$timeout","Organisations","$modal",function(){return{restrict:"E",link:function(){}}}]),app.controller("ModalController",["$scope","leafletData","$modal",function(e,o,t){return e.items=["item1","item2","item3"],e.open=function(){var o;return o=t.open({templateUrl:"myModalContent.html",scope:e,resolve:{items:function(){return e.items}}}),o.result.then(function(o){e.selected=o},function(){return $log.info("Modal dismissed at: "+new Date)})}}]),app.controller("NavBarController",["$scope","leafletData","$modal","authService","$state",function(e,o,t,r,n){return $(document).foundation(),e.openLogin=function(){return r.showLogin()},e.openRegister=function(){return r.showRegister()},e.logout=function(){return console.log("go"),r.destroySession(),n.go("index").then(function(){return n.reload()})}}]),app.factory("Organisations",["$http","$q","appConfig","ipCookie",function(e,o,t){return[{type:"Feature",properties:{email:"glovermercado@vortexaco.com",phone:"0606066425",name:"Digirang"},geometry:{type:"Point",coordinates:[2.87621809640683,49.23309107534936]}},{type:"Feature",properties:{email:"glovermercado@digirang.com",phone:"0699604811",name:"Fuelworks"},geometry:{type:"Point",coordinates:[2.24984161341155,48.56076704679034]}},{type:"Feature",properties:{email:"glovermercado@fuelworks.com",phone:"0633041406",name:"Myopium"},geometry:{type:"Point",coordinates:[2.46154649739651,49.22799603133332]}},{type:"Feature",properties:{email:"glovermercado@myopium.com",phone:"0674025723",name:"Rodeology"},geometry:{type:"Point",coordinates:[2.79108755301138,49.07995140584039]}},{type:"Feature",properties:{email:"glovermercado@rodeology.com",phone:"0661197401",name:"Cedward"},geometry:{type:"Point",coordinates:[1.68037630688531,48.84846903925272]}},{type:"Feature",properties:{email:"glovermercado@cedward.com",phone:"0653505187",name:"Xelegyl"},geometry:{type:"Point",coordinates:[1.72754463106941,49.34392051512258]}},{type:"Feature",properties:{email:"glovermercado@xelegyl.com",phone:"0667579485",name:"Rodemco"},geometry:{type:"Point",coordinates:[2.52940548385851,49.17522775995004]}},{type:"Feature",properties:{email:"glovermercado@rodemco.com",phone:"0651608283",name:"Manufact"},geometry:{type:"Point",coordinates:[2.33134210978562,49.12422721512231]}},{type:"Feature",properties:{email:"glovermercado@manufact.com",phone:"0681767254",name:"Kongle"},geometry:{type:"Point",coordinates:[2.90321192086253,48.86264572529426]}},{type:"Feature",properties:{email:"glovermercado@kongle.com",phone:"0690474050",name:"Assitia"},geometry:{type:"Point",coordinates:[2.14221837777615,48.81298541128277]}},{type:"Feature",properties:{email:"glovermercado@assitia.com",phone:"0648235061",name:"Cincyr"},geometry:{type:"Point",coordinates:[2.12706502342883,48.98025639694533]}},{type:"Feature",properties:{email:"glovermercado@cincyr.com",phone:"0653907924",name:"Songbird"},geometry:{type:"Point",coordinates:[2.89799199810289,49.13905126422115]}},{type:"Feature",properties:{email:"glovermercado@songbird.com",phone:"0628194217",name:"Medicroix"},geometry:{type:"Point",coordinates:[1.85322991976762,49.2588597242296]}},{type:"Feature",properties:{email:"glovermercado@medicroix.com",phone:"0654074738",name:"Teraprene"},geometry:{type:"Point",coordinates:[2.40830218913174,48.77781102136701]}},{type:"Feature",properties:{email:"glovermercado@teraprene.com",phone:"0653193867",name:"Everest"},geometry:{type:"Point",coordinates:[1.96605947128063,48.92675152811641]}},{type:"Feature",properties:{email:"glovermercado@everest.com",phone:"0636014776",name:"Mediot"},geometry:{type:"Point",coordinates:[1.78100573047602,49.08081517382433]}},{type:"Feature",properties:{email:"glovermercado@mediot.com",phone:"0633528245",name:"Austech"},geometry:{type:"Point",coordinates:[1.7848418186847,48.60059959443279]}},{type:"Feature",properties:{email:"glovermercado@austech.com",phone:"0653921149",name:"Ecratic"},geometry:{type:"Point",coordinates:[1.72446177744263,49.08633350156281]}},{type:"Feature",properties:{email:"glovermercado@ecratic.com",phone:"0621207959",name:"Cuizine"},geometry:{type:"Point",coordinates:[2.26893268016141,48.68698274191808]}},{type:"Feature",properties:{email:"glovermercado@cuizine.com",phone:"0650890015",name:"Geekola"},geometry:{type:"Point",coordinates:[1.93102753717824,48.8692743574738]}},{type:"Feature",properties:{email:"glovermercado@geekola.com",phone:"0671245476",name:"Medcom"},geometry:{type:"Point",coordinates:[2.89107656682887,48.81992689674786]}},{type:"Feature",properties:{email:"glovermercado@medcom.com",phone:"0660335183",name:"Amril"},geometry:{type:"Point",coordinates:[2.75573285934911,48.9219747420149]}},{type:"Feature",properties:{email:"glovermercado@amril.com",phone:"0606449033",name:"Inquala"},geometry:{type:"Point",coordinates:[2.89102986759559,49.2982378718847]}},{type:"Feature",properties:{email:"glovermercado@inquala.com",phone:"0651224778",name:"Equicom"},geometry:{type:"Point",coordinates:[1.83373870137473,48.63054777831186]}},{type:"Feature",properties:{email:"glovermercado@equicom.com",phone:"0689198150",name:"Buzzopia"},geometry:{type:"Point",coordinates:[2.00930634831053,49.02549610952311]}},{type:"Feature",properties:{email:"glovermercado@buzzopia.com",phone:"0644201100",name:"Gadtron"},geometry:{type:"Point",coordinates:[2.89833843880302,48.73285863051005]}},{type:"Feature",properties:{email:"glovermercado@gadtron.com",phone:"0639465587",name:"Zogak"},geometry:{type:"Point",coordinates:[2.0114045674066,49.11514435497938]}},{type:"Feature",properties:{email:"glovermercado@zogak.com",phone:"0688202156",name:"Gynko"},geometry:{type:"Point",coordinates:[2.14963155100662,49.33710019091878]}},{type:"Feature",properties:{email:"glovermercado@gynko.com",phone:"0669346009",name:"Pasturia"},geometry:{type:"Point",coordinates:[2.45238013142625,49.30683884654004]}},{type:"Feature",properties:{email:"glovermercado@pasturia.com",phone:"0666695524",name:"Terragen"},geometry:{type:"Point",coordinates:[2.35834225466391,49.25401786530592]}},{type:"Feature",properties:{email:"glovermercado@terragen.com",phone:"0678993752",name:"Fossiel"},geometry:{type:"Point",coordinates:[2.20146268061569,49.19314976892138]}},{type:"Feature",properties:{email:"glovermercado@fossiel.com",phone:"0653119914",name:"Xinware"},geometry:{type:"Point",coordinates:[2.68412944198417,49.00825891074779]}},{type:"Feature",properties:{email:"glovermercado@xinware.com",phone:"0616659951",name:"Comtrak"},geometry:{type:"Point",coordinates:[2.21227942523569,49.20865273745256]}},{type:"Feature",properties:{email:"glovermercado@comtrak.com",phone:"0602663512",name:"Tourmania"},geometry:{type:"Point",coordinates:[2.13835281132362,48.78526205213805]}},{type:"Feature",properties:{email:"glovermercado@tourmania.com",phone:"0694389609",name:"Qualitern"},geometry:{type:"Point",coordinates:[2.30268876080572,48.98433293313579]}},{type:"Feature",properties:{email:"glovermercado@qualitern.com",phone:"0604688268",name:"Senmao"},geometry:{type:"Point",coordinates:[1.90543848385716,48.73551330763436]}},{type:"Feature",properties:{email:"glovermercado@senmao.com",phone:"0686430238",name:"Calcula"},geometry:{type:"Point",coordinates:[2.11070788420813,49.05833282375786]}},{type:"Feature",properties:{email:"glovermercado@calcula.com",phone:"0645123496",name:"Strozen"},geometry:{type:"Point",coordinates:[2.53278084838399,48.62646754212809]}},{type:"Feature",properties:{email:"glovermercado@strozen.com",phone:"0698498192",name:"Inear"},geometry:{type:"Point",coordinates:[2.76396154447439,49.2161243797599]}},{type:"Feature",properties:{email:"glovermercado@inear.com",phone:"0612713579",name:"Moltonic"},geometry:{type:"Point",coordinates:[1.98559222219814,48.97997608189267]}},{type:"Feature",properties:{email:"glovermercado@moltonic.com",phone:"0642548514",name:"Skinserve"},geometry:{type:"Point",coordinates:[1.67823210484699,48.88055917676059]}},{type:"Feature",properties:{email:"glovermercado@skinserve.com",phone:"0686849042",name:"Krag"},geometry:{type:"Point",coordinates:[2.66156602666882,49.24327036773907]}},{type:"Feature",properties:{email:"glovermercado@krag.com",phone:"0667663458",name:"Enormo"},geometry:{type:"Point",coordinates:[1.96248732587236,49.33282351393214]}},{type:"Feature",properties:{email:"glovermercado@enormo.com",phone:"0652508599",name:"Ontagene"},geometry:{type:"Point",coordinates:[2.69336570089706,48.5820879790428]}},{type:"Feature",properties:{email:"glovermercado@ontagene.com",phone:"0610085129",name:"Accruex"},geometry:{type:"Point",coordinates:[1.96816376693676,49.26795266049716]}},{type:"Feature",properties:{email:"glovermercado@accruex.com",phone:"0680788387",name:"Lumbrex"},geometry:{type:"Point",coordinates:[2.27878250720181,49.15688522604675]}},{type:"Feature",properties:{email:"glovermercado@lumbrex.com",phone:"0683810128",name:"Skyplex"},geometry:{type:"Point",coordinates:[2.38611386262761,49.11243311574624]}},{type:"Feature",properties:{email:"glovermercado@skyplex.com",phone:"0638328436",name:"Vinch"},geometry:{type:"Point",coordinates:[2.10953223501093,49.07352164628787]}},{type:"Feature",properties:{email:"glovermercado@vinch.com",phone:"0687908951",name:"Mixers"},geometry:{type:"Point",coordinates:[2.17412210658694,48.7172917347854]}},{type:"Feature",properties:{email:"glovermercado@mixers.com",phone:"0681811346",name:"Vicon"},geometry:{type:"Point",coordinates:[2.10261371765512,49.13469758656513]}},{type:"Feature",properties:{email:"glovermercado@vicon.com",phone:"0617565261",name:"Enthaze"},geometry:{type:"Point",coordinates:[2.38519162013404,49.04994184261231]}},{type:"Feature",properties:{email:"glovermercado@enthaze.com",phone:"0603638730",name:"Squish"},geometry:{type:"Point",coordinates:[2.46218993941937,49.26032613432958]}},{type:"Feature",properties:{email:"glovermercado@squish.com",phone:"0657892670",name:"Quizmo"},geometry:{type:"Point",coordinates:[2.56441309259998,48.84963088586248]}},{type:"Feature",properties:{email:"glovermercado@quizmo.com",phone:"0647569221",name:"Ultrasure"},geometry:{type:"Point",coordinates:[2.82277714375169,49.33264346804626]}},{type:"Feature",properties:{email:"glovermercado@ultrasure.com",phone:"0644853773",name:"Centrexin"},geometry:{type:"Point",coordinates:[2.87777129392623,48.61138209906813]}},{type:"Feature",properties:{email:"glovermercado@centrexin.com",phone:"0654980041",name:"Bisba"},geometry:{type:"Point",coordinates:[1.81927409247209,49.22701995242455]}},{type:"Feature",properties:{email:"glovermercado@bisba.com",phone:"0671970094",name:"Quility"},geometry:{type:"Point",coordinates:[2.64340314130351,49.05094010805713]}},{type:"Feature",properties:{email:"glovermercado@quility.com",phone:"0644448883",name:"Magnina"},geometry:{type:"Point",coordinates:[1.7182355563935,49.31871142128999]}},{type:"Feature",properties:{email:"glovermercado@magnina.com",phone:"0671140467",name:"Klugger"},geometry:{type:"Point",coordinates:[2.598490417856,48.66407324915925]}},{type:"Feature",properties:{email:"glovermercado@klugger.com",phone:"0612192259",name:"Idego"},geometry:{type:"Point",coordinates:[2.70214985985887,48.53727001986992]}},{type:"Feature",properties:{email:"glovermercado@idego.com",phone:"0695763628",name:"Lyria"},geometry:{type:"Point",coordinates:[2.12652939188331,48.59879794353719]}},{type:"Feature",properties:{email:"glovermercado@lyria.com",phone:"0677456278",name:"Cowtown"},geometry:{type:"Point",coordinates:[2.86396429725385,48.74746519291269]}},{type:"Feature",properties:{email:"glovermercado@cowtown.com",phone:"0609507258",name:"Entropix"},geometry:{type:"Point",coordinates:[1.8433600280477,48.70871607403684]}},{type:"Feature",properties:{email:"glovermercado@entropix.com",phone:"0603825894",name:"Amtas"},geometry:{type:"Point",coordinates:[2.68159894228318,49.34267477508612]}},{type:"Feature",properties:{email:"glovermercado@amtas.com",phone:"0611051775",name:"Flotonic"},geometry:{type:"Point",coordinates:[2.84801086995145,49.23374108597107]}},{type:"Feature",properties:{email:"glovermercado@flotonic.com",phone:"0612050698",name:"Deviltoe"},geometry:{type:"Point",coordinates:[2.87474640751128,48.83082633739557]}},{type:"Feature",properties:{email:"glovermercado@deviltoe.com",phone:"0625301719",name:"Zentility"},geometry:{type:"Point",coordinates:[2.72975331534183,48.77977569192758]}},{type:"Feature",properties:{email:"glovermercado@zentility.com",phone:"0638084004",name:"Geeknet"},geometry:{type:"Point",coordinates:[2.44127047937354,49.1745771310647]}},{type:"Feature",properties:{email:"glovermercado@geeknet.com",phone:"0658481559",name:"Hometown"},geometry:{type:"Point",coordinates:[2.53590481005574,48.94770285512306]}},{type:"Feature",properties:{email:"glovermercado@hometown.com",phone:"0602404687",name:"Exospeed"},geometry:{type:"Point",coordinates:[2.17666985816464,48.78802897076678]}},{type:"Feature",properties:{email:"glovermercado@exospeed.com",phone:"0634347354",name:"Colaire"},geometry:{type:"Point",coordinates:[2.7241368732848,48.61915214581702]}},{type:"Feature",properties:{email:"glovermercado@colaire.com",phone:"0601861704",name:"Sustenza"},geometry:{type:"Point",coordinates:[2.38111905234064,49.26388743043843]}},{type:"Feature",properties:{email:"glovermercado@sustenza.com",phone:"0692766934",name:"Enerforce"},geometry:{type:"Point",coordinates:[2.23356244872008,48.78865945143001]}},{type:"Feature",properties:{email:"glovermercado@enerforce.com",phone:"0628440237",name:"Daisu"},geometry:{type:"Point",coordinates:[1.76431727562119,49.30070857914349]}},{type:"Feature",properties:{email:"glovermercado@daisu.com",phone:"0654688407",name:"Eplode"},geometry:{type:"Point",coordinates:[2.35942369555914,48.52385585539012]}},{type:"Feature",properties:{email:"glovermercado@eplode.com",phone:"0658612193",name:"Ginkle"},geometry:{type:"Point",coordinates:[1.68747429029594,48.81022964441164]}},{type:"Feature",properties:{email:"glovermercado@ginkle.com",phone:"0646448543",name:"Veraq"},geometry:{type:"Point",coordinates:[2.27862478109444,49.0403855867923]}},{type:"Feature",properties:{email:"glovermercado@veraq.com",phone:"0664601685",name:"Earbang"},geometry:{type:"Point",coordinates:[1.8003061451185,48.99037223792074]}},{type:"Feature",properties:{email:"glovermercado@earbang.com",phone:"0611062654",name:"Geeky"},geometry:{type:"Point",coordinates:[1.67315126374235,48.77136500113588]}},{type:"Feature",properties:{email:"glovermercado@geeky.com",phone:"0600378966",name:"Solaren"},geometry:{type:"Point",coordinates:[2.88824223588932,48.73645479638071]}},{type:"Feature",properties:{email:"glovermercado@solaren.com",phone:"0653819079",name:"Waab"},geometry:{type:"Point",coordinates:[1.84332494655479,49.01775533460378]}},{type:"Feature",properties:{email:"glovermercado@waab.com",phone:"0666447991",name:"Zytrex"},geometry:{type:"Point",coordinates:[2.588618625538,49.20584280692892]}},{type:"Feature",properties:{email:"glovermercado@zytrex.com",phone:"0692662086",name:"Lingoage"},geometry:{type:"Point",coordinates:[2.53840174438863,49.00868654935508]}},{type:"Feature",properties:{email:"glovermercado@lingoage.com",phone:"0601222376",name:"Ginkogene"},geometry:{type:"Point",coordinates:[2.78233124644515,48.57055233227315]}},{type:"Feature",properties:{email:"glovermercado@ginkogene.com",phone:"0678738745",name:"Insuresys"},geometry:{type:"Point",coordinates:[2.81199106874254,49.12762930163499]}},{type:"Feature",properties:{email:"glovermercado@insuresys.com",phone:"0613401742",name:"Sarasonic"},geometry:{type:"Point",coordinates:[2.51166274156873,48.9297885009995]}},{type:"Feature",properties:{email:"glovermercado@sarasonic.com",phone:"0601206629",name:"Plasto"},geometry:{type:"Point",coordinates:[1.67426286093104,49.11562445298705]}},{type:"Feature",properties:{email:"glovermercado@plasto.com",phone:"0660523218",name:"Pathways"},geometry:{type:"Point",coordinates:[2.17707651673067,49.32762374115855]}},{type:"Feature",properties:{email:"glovermercado@pathways.com",phone:"0635766126",name:"Orboid"},geometry:{type:"Point",coordinates:[1.96101616058997,48.87990654158677]}},{type:"Feature",properties:{email:"glovermercado@orboid.com",phone:"0625669054",name:"Zaphire"},geometry:{type:"Point",coordinates:[2.74969609565857,48.97065447668001]}},{type:"Feature",properties:{email:"glovermercado@zaphire.com",phone:"0643422887",name:"Illumity"},geometry:{type:"Point",coordinates:[2.5119244551891,49.12199324530238]}},{type:"Feature",properties:{email:"glovermercado@illumity.com",phone:"0666942811",name:"Zillatide"},geometry:{type:"Point",coordinates:[2.14152024141782,49.10322997839765]}},{type:"Feature",properties:{email:"glovermercado@zillatide.com",phone:"0622687228",name:"Gleamink"},geometry:{type:"Point",coordinates:[2.38119178250173,49.25437052333969]}},{type:"Feature",properties:{email:"glovermercado@gleamink.com",phone:"0696983707",name:"Applica"},geometry:{type:"Point",coordinates:[1.80099345621614,48.60757809900792]}},{type:"Feature",properties:{email:"glovermercado@applica.com",phone:"0606387679",name:"Zaya"},geometry:{type:"Point",coordinates:[1.99710692197101,48.61933754723898]}},{type:"Feature",properties:{email:"glovermercado@zaya.com",phone:"0606961069",name:"Terrasys"},geometry:{type:"Point",coordinates:[2.66640257311536,48.83583502643653]}},{type:"Feature",properties:{email:"glovermercado@terrasys.com",phone:"0658170311",name:"Mondicil"},geometry:{type:"Point",coordinates:[2.790020290266,48.7796080818853]}},{type:"Feature",properties:{email:"glovermercado@mondicil.com",phone:"0686128927",name:"Zuvy"},geometry:{type:"Point",coordinates:[2.00500230437968,49.26373662608259]}}]}]),app.controller("RegisterController",["$scope","$modalInstance","authService","userData",function(e,o,t,r){return e.cancel=function(){return t.hideRegister()},e.register=function(e,o){return console.log(o),e.$invalid?void 0:r.create(o).then(function(){return t.hideRegister()},function(){return o.error="email Already use"})}}]),app.controller("SkillsController",["$scope","leafletData",function(){}]),app.controller("StructuresController",["$scope","leafletData",function(){}]),app.factory("userData",["$http","$q","appConfig","ipCookie",function(e,o,t,r){return{login:function(r){var n;return n=o.defer(),e({method:"POST",url:t.url("sessions/login"),data:r}).success(function(e){return n.resolve(e)}).error(function(e){return n.reject(e)}),n.promise},checkUser:function(){var n;return n=o.defer(),e({method:"GET",url:t.url("sessions"),headers:{"X-token":r("token"),"X-email":r("email")}}).success(function(e,o){return n.resolve(o)}).error(function(e,o){return n.reject(o)}),n.promise},create:function(r){var n;return n=o.defer(),e({method:"POST",url:t.url("users"),data:r}).success(function(e,o){return n.resolve(o)}).error(function(e,o){return n.reject(o)}),n.promise},update:function(n){var a;return a=o.defer(),e({method:"PUT",url:t.url("users"),params:{id:n._id},data:n,headers:{token:r("token"),email:r("email")}}).success(function(e,o){return a.resolve(o)}).error(function(e,o){return a.reject(o)}),a.promise},"delete":function(){var r;return r=o.defer(),e({method:"DELETE",url:t.url("users"),params:{id:user._id},data:user}).success(function(e,o){return r.resolve(o)}).error(function(e,o){return r.reject(o)}),r.promise}}}]);