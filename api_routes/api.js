'use strict'
var utilService = require('../services/util.service');
var C = require('../constants');

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

exports.registerUser = function(req, models, callback, smtTransport){
	var UserModel = models.User;

	var userModel = new UserModel();
	userModel.password = req.body.password;
	userModel.last_name = req.body.last_name;
	userModel.first_name = req.body.first_name;
	userModel.display_name = req.body.first_name + " " + req.body.last_name;
	userModel.user_id = req.body.email;
	userModel.user_type = 'normal';
	userModel.email = req.body.email;

	userModel.save(function(err, response){
		if(err){
			console.log(err);
            callback({code:500, message:"Internal Error: Couldn't save Property"});
		} else {
			var token = utilService.getRandomToken();
			console.log(token);
			var link = C.config.appHostName+"/api/verify-mail?token="+token+"&userId="+userModel.user_id;
			console.log(link);
			var html = '<html><body><h2> Hi '+userModel.display_name+', Welcome to propertyowl</h2><h5>Please verify by clicking on link below or paste url : '+link+' </h5><div><a href = "'+link+'">verify email ......</a></div></body></html>'
			var mailOptions={
		        to : userModel.email,
		        subject : 'Property Owl Email Verification',
		      //  text : 'Test',
		        html: html
		    }

		    smtTransport.sendMail(mailOptions, function(err, response){
		    	if(response){
		    		userModel.verify_token = token;
		    		userModel.save(function(err){
		    			if(err) throw err;
		    			//TODO: redirect to email verification page
		    		});
		    	}
		    });
			callback(null, {}, '/submit-property');
		}
	});
};

exports.getAllProperties = function(req, models, callback){
	var PropertyModel = models.Property;
	PropertyModel.find({}, function(err, response){
		if(err) {
			console.log(err);
			callback({code:500, message : "Internal Server Error : Couldn't retrieve proprties"});
		} else {
			callback(null, response);
		}
	});
};

exports.verifyMail = function(req, models, callback, smtTransport){
	var UserModel = models.User;
	var userId = req.query.userId;
	var token = req.query.token;
	console.log(req);
	console.log(token);
	console.log(userId);

	UserModel.findOne({'user_id' : userId}, function(err, user){
		if(user){
			if(user.verify_token == token){
				user.email_verified = 1;
				user.save(function(err){
					if(err) return callback(err);
					var html = '<html><body><h2> Hi '+user.display_name+',  Your email has been successfully verified</body></html>'
					var mailOptions={
				        to : user.email,
				        subject : 'Property Owl Email Verification Successful',
				      //  text : 'Test',
				        html: html
				    }

				    smtTransport.sendMail(mailOptions, function(err, response){
				    	if(response){
				    		console.log(response);
				    	}
				    });
				    callback(null, {}, '/');
				});
			} else {
				callback(null, {"error": "Token does not match"});
			}
		} else {
			callback(null, {"error": "User does not exist"})
		}
	});

};