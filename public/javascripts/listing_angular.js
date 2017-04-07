var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("/api/get-all-property").then(function (response) {
      $scope.myData = response.data.data;
  });
});
