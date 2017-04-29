var randomstring = require("randomstring");

exports.getRandomToken = function (){
    return randomstring.generate();
};