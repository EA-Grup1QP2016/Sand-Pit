/* route middleware to check whether user is authenticated */
function isAuth(req, res, next) {
    // if user is authenticated, go on
    if (req.isAuthenticated())
        return next();
    // otherwise, send her back to home
    res.redirect('/');
}

module.exports.isAuth = isAuth;