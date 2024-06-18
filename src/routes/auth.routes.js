const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { isNotAuth } = require('../utils/auth');

router.get('/login', isNotAuth, passport.authenticate('discord'));

router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dash',
}));

router.get('/logout', (req, res, next) => {
    if (req.user) req.logout((e) => {
        if (e) return next(e);
    });
    res.redirect('/');
});

module.exports = router;