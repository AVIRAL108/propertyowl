var app = angular.module('SearchingApp',[]);
 app.controller('searchCtrl', function($scope, $http) {
      $scope.entry ={};
        $scope.submitForm = function() {
      
             $http({
                  method: 'POST',
                  url: url,
                  data: $.param({query: $scope.entry}),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function () {});
                   };
                  });