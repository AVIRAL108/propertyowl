'use strict'

exports.submitProperty = function(req, models, callback){
	var reqdata = req.body.data;
	var PropertyModel = models.Property;
	var propertyModel = new PropertyModel();
	for(var i in reqdata){
		propertyModel[i] = reqdata[i];
	}
	propertyModel.save(function(err, response){
		if(err){
			console.log(err);
            callback({code:500, message:"Internal Error: Couldn't save Property"});
		} else {
			callback(null, "Property has been saved successfully");
		}
	});
};

exports.getAllProperties = function(res, models, callback){
	var PropertyModel = models.Property;
	PropertyModel.find({}, function(err, response){
		if(err) {
			console.log(err);
			callback({code:500, message : "Internal Server Error : Couldn't retrieve proprties"});
		} else {
			callback(null, response);
		}
	});
}