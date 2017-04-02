'use strict'

var api_routes = require('./api');

exports._responseCallback = function(err, response, res) {
    if (err != null) {
        res.status(err.code).end(err.message);
    } else{
       	var responseObj = {};
        responseObj.status = 'success';
        responseObj.data = {};
        if (response) {
            responseObj.data = response;
        }
        res.json(responseObj);  
    }
};


exports.submitProperty = function(req, res, models){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response) {
        exports._responseCallback(err, response, res);
    }
    api_routes.submitProperty(req, models, callback);
};

exports.getAllProperties = function(req, res, models){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response) {
        exports._responseCallback(err, response, res);
    }
    api_routes.getAllProperties(req, models, callback);
};
