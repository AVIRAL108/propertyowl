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
    appHostName : 'http://localhost:3008',
    mongoUrl : 'mongodb://127.0.0.1/property_owl',
    googleAuth : {
        'clientID'      : '835473088999-v96d0kdhnv596ocfn155sck1dk1rs7it.apps.googleusercontent.com',
        'clientSecret'  : 'LsvXAg99Uaj38P5p8Iv1339R',
        'callbackURL'   : 'http://localhost:3008/auth/google/callback'
    },
    facebookAuth : {
        'clientID'      : '652136678317917', // your App ID
        'clientSecret'  : 'd0ba8cd6f52243da3a425f6928a43b7a', // your App Secret
        'callbackURL'   : 'http://localhost:3008/auth/facebook/callback'
    },
  },
  production : {
    environment : environments.DEVELOPMENT,
    appPort : 3008,
    appHostName : 'http://localhost:3008',
    mongoUrl : 'mongodb://127.0.0.1/property_owl',
    googleAuth : {
        'clientID'      : '835473088999-v96d0kdhnv596ocfn155sck1dk1rs7it.apps.googleusercontent.com',
        'clientSecret'  : 'LsvXAg99Uaj38P5p8Iv1339R',
        'callbackURL'   : 'http://localhost:3008/auth/google/callback'
    },
    facebookAuth : {
        'clientID'      : '652136678317917', // your App ID
        'clientSecret'  : 'd0ba8cd6f52243da3a425f6928a43b7a', // your App Secret
        'callbackURL'   : 'http://localhost:3008/auth/facebook/callback'
    },
  }
};


var currentConfig;

if (process.env.NODE_ENV == 'production') {
  currentConfig = config.production;
} else {
  currentConfig = config.development;
}

exports.config = currentConfig;
