var app;

app = angular.module('app', ['ui.router', 'leaflet-directive', 'ipCookie']);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state;
    $state = $injector.get("$state");
    return $state.go("map");
  });
  return $stateProvider.state('map', {
    url: "/",
    templateUrl: "partials/map.html",
    controller: "mapController"
  }).state('users', {
    url: "/users",
    resolve: {
      check: ["$state", "authService", function($state, authService) {
        if (!authService.isAuthorize()) {
          authService.needsLogin = true;
          return $state.go('map');
        }
      }]
    }
  }).state('users.profile', {
    url: "/profile"
  });
}]);

app.factory('appConfig', function() {
  var path;
  path = 'http://localhost:3000';
  return {
    url: function(url) {
      return "" + path + "/" + url;
    }
  };
});

app.service('authService', ["ipCookie", "userData", function(ipCookie, userData) {
  return {
    user: {},
    token: null,
    isAuthorize: function() {
      if (!(ipCookie(token) && ipCookie(mail))) {
        false;
      }
      return userData.checkUser().then(function(result) {
        return console.log(result);
      });
    }
  };
}]);

app.controller('loginController', ["$scope", function($scope) {}]);

app.controller('mapController', ["$scope", "leafletData", function($scope, leafletData) {}]);

app.directive('map', ["leafletData", function(leafletData) {
  return {
    restrict: "E",
    link: function(scope, element, attrs, ctrl, e) {
      var getRandomLatLng, map, mapLink, markers;
      map = L.map('map', {
        center: 'center'
      }).setView([48.8375, 2.3291], 14);
      mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        minZoom: 10
      }).addTo(map);
      getRandomLatLng = function(map) {
        var bounds, latSpan, lngSpan, northEast, southWest;
        bounds = map.getBounds();
        southWest = bounds.getSouthWest();
        northEast = bounds.getNorthEast();
        lngSpan = northEast.lng - southWest.lng;
        latSpan = northEast.lat - southWest.lat;
        return new L.LatLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random());
      };
      markers = new L.MarkerClusterGroup();
      markers.initialize;
      markers.addLayer(new L.Marker(getRandomLatLng(map)));
      markers.addLayer(new L.Marker(getRandomLatLng(map)));
      markers.addLayer(new L.Marker(getRandomLatLng(map)));
      map.addLayer(markers);
      return map.on('click', function(e) {
        var marker;
        marker = L.marker(e.latlng);
        markersList.push({
          latlng: e.latlng
        });
        marker.addTo(map);
      });
    }
  };
}]);

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
        return deferred.resolve(status);
      }).error(function(data, status, headers, config) {
        return deferred.reject(status);
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
          'token': ipCookie('token'),
          'mail': ipCookie('mail')
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
        data: user
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
