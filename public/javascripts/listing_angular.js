var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("https://jsonplaceholder.typicode.com/posts/").then(function (response) {
      $scope.myData = response.data;
  });
});
