var app = angular.module('userSubmit', []);
app.controller('UserCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.User = [{
	"data":	{"email":"email",
	"first_name": "first_name",
	"last_name": "last_name",
	"password": "password"
}}];

	$scope.submit_form = function(){
		$scope.User.push({ 
			'data':{
			'email': $scope.email,
			'first_name': $scope.first_name,
			'last_name' : $scope.last_name,
			'password' : $scope.password
			}});

	
	var dataObj = { 
			data:{
			email: $scope.email,
			first_name: $scope.first_name,
			last_name : $scope.last_name,
			password : $scope.password
		
		}};

		var res = $http.post('/api/register', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;

		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
		
};
}]);	
