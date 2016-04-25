/*
 * Configuration data for different passport strategies
 */
module.exports = {
    'facebookAuth': {
        clientID: '1583874288589589',
        clientSecret: '57849f4434453df3caa7709db80fdace',
        callbackURL: 'http://localhost:5000/facebook/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']// [1]
    }
//'twitterAuth': { clientID: ..., clientSecret: ... }
};
//[1] http://passportjs.org/docs/profile