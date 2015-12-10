var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/pages/channels.html',
    controller: 'channelsCtrl'
  }).when('/wishlist', {
    templateUrl: '/pages/wishlist.html',
    controller: 'wishlistCtrl'
  });
}]);

app.controller('channelsCtrl', ['$scope', '$http', function ($scope, $http) {
  $http({
    url: '/api/channels',
    method: 'get'
  }).then(function (response) {
    $scope.channels = response.data
  });
}]);

app.controller('wishlistCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.submitChannel = function () {
    $http({
      url: '/api/channels',
      method: 'post',
      data: {channelName: $scope.channelName, channelPurpose: $scope.channelPurpose, channelExists: false}
    }).then(function(){
      $scope.message = 'Thanks for your submission!';
    });
  };
}]);
