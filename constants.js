var environments = {
  DEVELOPMENT : 'development',
  PROD : 'production'
};

exports.ENVIRONMENTS = environments;

var config = {
  // This mode will run allow all routes via same PORT (3000)
  development : {
    environment : environments.DEVELOPMENT,
    appPort : 3008,
    appHostName : 'localhost:3008',
    mongoUrl : 'mongodb://127.0.0.1/property_owl',
  },
  production : {
    environment : environments.DEVELOPMENT,
    appPort : 3008,
    appHostName : 'localhost:3008',
    mongoUrl : 'mongodb://127.0.0.1/property_owl',
  }
};


var currentConfig;

if (process.env.NODE_ENV == 'production') {
  currentConfig = config.production;
} else {
  currentConfig = config.development;
}

exports.config = currentConfig;
