var app;

app = angular.module('app', ['ui.router', 'leaflet-directive', 'ipCookie', 'mm.foundation']);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state;
    $state = $injector.get("$state");
    return $state.go("index");
  });
  $locationProvider.html5Mode(true);
  return $stateProvider.state('index', {
    url: "/",
    views: {
      "": {
        templateUrl: "partials/map.html",
        controller: "mapController"
      },
      "navbar": {
        templateUrl: 'partials/navbar.html',
        controller: "navBarController"
      }
    },
    onEnter: ["authService", function(authService) {
      if (authService.needsLogin) {
        return authService.showLogin();
      }
    }]
  }).state('users', {
    url: "/users",
    resolve: {
      check: ["$state", "authService", function($state, authService) {
        return authService.isAuthorize();
      }]
    }
  }).state('users.profile', {
    url: "/profile"
  }).state('structures', {
    url: "/structures",
    templateUrl: "partials/structures.html",
    controller: "structuresController"
  }).state('skills', {
    url: "/skills",
    templateUrl: "partials/skills.html",
    controller: "skillsController"
  }).state('assets', {
    url: "/assets",
    templateUrl: "partials/assets.html",
    controller: "assetsController"
  });
}]);

app.factory('appConfig', function() {
  var path;
  path = 'http://localhost:3000/api';
  return {
    url: function(url) {
      return "" + path + "/" + url;
    }
  };
});

app.controller('assetsController', ["$scope", "leafletData", function($scope, leafletData) {}]);

app.service('authService', ["ipCookie", "userData", "$state", "$modal", function(ipCookie, userData, $state, $modal) {
  return {
    user: {},
    token: null,
    needsLogin: false,
    setSession: function(user) {
      this.user = user;
      this.token = user.token;
      ipCookie('token', this.token);
      return ipCookie('email', this.user.email);
    },
    isAuthorize: function() {
      if (!(ipCookie('token') || ipCookie('mail'))) {
        this.needsLogin = true;
        return $state.go('index');
      }
      return userData.checkUser().then(function(result) {
        if (result !== 204) {
          return $state.go('index');
        }
      });
    },
    showLogin: function() {
      this.login = $modal.open({
        templateUrl: 'partials/login.html',
        controller: 'loginController'
      });
      return this.login.result.then(function(selectedItem) {
        return $scope.selected = selectedItem;
      });
    },
    hideLogin: function() {
      return this.login.dismiss('cancel');
    },
    showRegister: function(size) {
      this.register = $modal.open({
        templateUrl: 'partials/register.html',
        controller: 'registerController'
      });
      return this.register.result.then(function(selectedItem) {
        return $scope.selected = selectedItem;
      });
    },
    hideRegister: function() {
      return this.register.dismiss('cancel');
    }
  };
}]);

app.controller('loginController', ["$scope", "$modalInstance", "authService", "userData", function($scope, $modalInstance, authService, userData) {
  $scope.cancel = function() {
    return authService.hideLogin();
  };
  return $scope.login = function(loginForm, user) {
    if (!loginForm.$invalid) {
      return userData.login(user).then(function(user) {
        return authService.setSession(user);
      }, function(data) {
        return user.error = data;
      });
    }
  };
}]);

app.controller('mapController', ["$scope", "leafletData", "$modal", "authService", function($scope, leafletData, $modal, authService) {
  return $scope.open = function(size) {
    return authService.showLogin();
  };
}]);

app.directive('map', ["leafletData", function(leafletData) {
  return {
    restrict: "E",
    link: function(scope, element, attrs, ctrl, e) {
      var getRandomLatLng, map, mapboxTiles, onLocationError, onLocationFound;
      L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw';
      mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
      });
      map = L.map('map').addLayer(mapboxTiles).setView([51.505, -0.09], 13);
      getRandomLatLng = function(map) {
        var bounds, latSpan, lngSpan, northEast, southWest;
        bounds = map.getBounds();
        southWest = bounds.getSouthWest();
        northEast = bounds.getNorthEast();
        lngSpan = northEast.lng - southWest.lng;
        latSpan = northEast.lat - southWest.lat;
        return new L.LatLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random());
      };
      onLocationFound = function(e) {
        var i, markers, _i;
        markers = new L.MarkerClusterGroup();
        for (i = _i = 0; _i <= 300; i = ++_i) {
          markers.addLayer(new L.Marker(getRandomLatLng(map)));
        }
        return map.addLayer(markers);
      };
      onLocationError = function(e) {
        return alert(e.message);
      };
      map.on('locationfound', onLocationFound);
      return map.on('locationerror', onLocationError);
    }
  };
}]);

app.controller('navBarController', ["$scope", "leafletData", "$modal", "authService", function($scope, leafletData, $modal, authService) {
  $(document).foundation();
  $scope.openLogin = function() {
    return authService.showLogin();
  };
  return $scope.openRegister = function() {
    return authService.showRegister();
  };
}]);

app.controller('registerController', ["$scope", "$modalInstance", "authService", "userData", function($scope, $modalInstance, authService, userData) {
  $scope.cancel = function() {
    return authService.hideRegister();
  };
  return $scope.register = function(registerForm, user) {
    if (!registerForm.$invalid) {
      return userData.create(user).then(function(result) {
        return console.log(result);
      }, function(data) {
        return user.error = data.message;
      });
    }
  };
}]);

app.controller('sideBarController', ["$scope", "leafletData", "$modal", "authService", function($scope, leafletData, $modal, authService) {
  $scope.openLogin = function() {
    return authService.showLogin();
  };
  return $scope.openRegister = function() {
    return authService.showRegister();
  };
}]);

app.controller('skillsController', ["$scope", "leafletData", function($scope, leafletData) {}]);

app.controller('structuresController', ["$scope", "leafletData", function($scope, leafletData) {}]);

app.factory('userData', ["$http", "$q", "appConfig", "ipCookie", function($http, $q, appConfig, ipCookie) {
  return {
    login: function(user) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'POST',
        url: appConfig.url('sessions/login'),
        data: user
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    },
    checkUser: function() {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'GET',
        url: appConfig.url('sessions'),
        headers: {
          'X-token': ipCookie('token'),
          'X-email': ipCookie('email')
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(status);
      }).error(function(data, status, headers, config) {
        return deferred.reject(status);
      });
      return deferred.promise;
    },
    create: function(user) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'POST',
        url: appConfig.url('users'),
        data: user
      }).success(function(data, status, headers, config) {
        return deferred.resolve(status);
      }).error(function(data, status, headers, config) {
        return deferred.reject(status);
      });
      return deferred.promise;
    },
    update: function(user) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'PUT',
        url: appConfig.url('users'),
        params: {
          id: user._id
        },
        data: user,
        headers: {
          'token': ipCookie('token'),
          'email': ipCookie('email')
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(status);
      }).error(function(data, status, headers, config) {
        return deferred.reject(status);
      });
      return deferred.promise;
    },
    "delete": function(id) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: appConfig.url('users'),
        params: {
          id: user._id
        },
        data: user
      }).success(function(data, status, headers, config) {
        return deferred.resolve(status);
      }).error(function(data, status, headers, config) {
        return deferred.reject(status);
      });
      return deferred.promise;
    }
  };
}]);
