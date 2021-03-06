'use strict'

var api_routes = require('./api');

exports._responseCallback = function(err, response, res, redirectUrl) {
    if (err != null) {
        res.status(err.code).end(err.message);
    } else{
        if(redirectUrl){
            res.redirect(redirectUrl);
        } else {
            var responseObj = {};
            responseObj.status = 'success';
            responseObj.data = {};
            if (response) {
                responseObj.data = response;
            }
            res.json(responseObj);  
        }
    }
};


exports.submitProperty = function(req, res, models){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response) {
        exports._responseCallback(err, response, res);
    }
    api_routes.submitProperty(req, models, callback);
};

exports.registerUser = function(req, res, models, smtTransport){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response, redirectUrl) {
        exports._responseCallback(err, response, res,redirectUrl);
    }
    api_routes.registerUser(req, models, callback, smtTransport);
};

exports.getAllProperties = function(req, res, models){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response) {
        exports._responseCallback(err, response, res);
    }
    api_routes.getAllProperties(req, models, callback);
};

exports.verifyMail = function(req, res, models, smtTransport){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");

    var callback = function(err, response, redirectUrl) {
        exports._responseCallback(err, response, res,redirectUrl);
    }
    api_routes.verifyMail(req, models, callback, smtTransport);
}