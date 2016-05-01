/*
 * Configuration data for different passport strategies
 *///ESTO TIENE QUE IR EN EL GITIGNORE

module.exports = {
    'facebookAuth': {
        clientID: '1583874288589589',
        clientSecret: '57849f4434453df3caa7709db80fdace',
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']// [1]
    },
    'twitterAuth': {
        consumerKey: 'wONKVrZE3DFTrkhVxaqf6I3Qz',
        consumerSecret: 'j2bW4xdIxIehQpv7tu2xefrVQsRHpLYloFcXYIpn1JbVklUo6s',
        callbackURL: 'http://localhost:5000/auth/twitter/callback',
        //profileFields: ['id', 'displayName', 'photos', 'emails']// [1]
    }
//'twitterAuth': { clientID: ..., clientSecret: ... }
};
//[1] http://passportjs.org/docs/profile