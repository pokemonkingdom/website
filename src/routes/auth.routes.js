const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { isNotAuth } = require('../utils/auth');

router.get('/login', isNotAuth, (req, res, next) => {
    passport.authenticate('discord')(req, res, next);
});

router.get('/discord/callback', (req, res, next) => {
    passport.authenticate('discord', {
        failureRedirect: '/forbidden',
        successRedirect: '/dash'
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    if (req.user) req.logout((e) => {
        if (e) return next(e);
    });
    res.redirect('/');
});

module.exports = router;