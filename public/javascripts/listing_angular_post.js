var app = angular.module('mypropertysubmit', []);
app.controller('submitCtrl', ['$scope', '$http', function ($scope, $http) {
$scope.type_of_advertisement = [
 {
  	value: "ATM"
  },
  {
    value: "Mobile/Communication Tower"
  }, {
    value: "Banner/Poster"
  }, {
    value: "Hoarding Board"
  }, {
    value: "Stalls"
  },
  {
    value: "Digital Offline Advertising"
  }
];
$scope.other_features = [
 {
  	value: "Audience"
  },
  {
    value: "Sound Units"
  }, {
    value: "Display Units"
  }, {
    value: "Furninshing"
  }, {
    value: "Air Conditiong"
  }
  ];
	$scope.Property = [{
	"data":	{"type":"Open",
	"ownership_type":"Agent",
	"price":300,
	"price_type":"Daily",
	"area":40,
	"area_unit":"Sq Ft",
	"full_address":{
		"address":"asasasasasa",
		"city":"As",
		"state":"saasa",
		"zip_code":177820,
		"google_location":"sdsdsdsdsd"
	},
	"description":"sdsdsdsdsdsdsdsds",
	"other_features":["Audience","Display Units","Furninshing"],
	"contact_details":{"name":"Ashsish Ranot","email":"asasasasas@asasa.com","phone":7878278137},
	"type_of_advertisement":["ATM","Banner/Poster","Stalls"]
}}];

	$scope.submit_form = function(){
    $scope.selectedRows=$scope.type_of_advertisement.reduce(function(arr, val) {
    	if(val.selected) arr.push(val.value)
      return arr
    }, []);
     $scope.selectedRows1=$scope.other_features.reduce(function(arr, val) {
    	if(val.selected) arr.push(val.value)
      return arr
    }, []);
		$scope.Property.push({ 
			'data':{
			'type':$scope.type,
	'ownership_type':$scope.ownership_type,
	'price':$scope.price,
	'price_type':$scope.price_type,
	'area':$scope.area,
	'area_unit':$scope.area_unit,
	'full_address':{
		'address':$scope.full_address.address,
		'city':$scope.full_address.city,
		'state':$scope.full_address.state,
		'zip_code':$scope.full_address.zip_code,
		'google_location':$scope.full_address.google_location
	},
	'description':$scope.description,
	'other_features':$scope.selectedRows1,
	'contact_details':{'name':$scope.contact_details.name,'email':$scope.contact_details.email,'phone':$scope.contact_details.phone},
	'type_of_advertisement':$scope.selectedRows
			}});

	
	var dataObj = { 
			data:{
			type:$scope.type,
	ownership_type:$scope.ownership_type,
	price:$scope.price,
	price_type:$scope.price_type,
	area:$scope.area,
	area_unit:$scope.area_unit,
	full_address:{
		address:$scope.full_address.address,
		city:$scope.full_address.city,
		state:$scope.full_address.state,
		zip_code:$scope.full_address.zip_code,
		google_location:$scope.full_address.google_location
	},
	description:$scope.description,
	other_features:$scope.selectedRows1,
	contact_details:{name:$scope.contact_details.name,email:$scope.contact_details.email,phone:$scope.contact_details.phone},
	type_of_advertisement:$scope.selectedRows
		}};

		var res = $http.post('/api/submit-property', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert("Data is sucessfully Saved")

		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
		
};
}]);	
