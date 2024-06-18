function isAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

function isNotAuth(req, res, next) {
    if (req.user) {
        res.redirect('/dash');
    } else {
        next();
    }
}

module.exports = {
    isAuth,
    isNotAuth
};