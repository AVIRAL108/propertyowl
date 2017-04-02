var app = angular.module('mypropertysubmit', []);
app.controller('submitCtrl', function ($scope, $http) {
	$scope.Property = {};
	$scope.submit_form = function()
            {
                $http({
                        url: "http://localhost:3008/api/submit-property",
                        method: "POST",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: $.param($scope.Property)
                    }).success(function(data, status, headers, config) {
                        $scope.status = status;
                    }).error(function(data, status, headers, config) {
                        $scope.status = status;
                    });
            }
  
});