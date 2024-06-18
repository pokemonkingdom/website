const { clientID, clientToken, clientRedirect } = require('../config');
const User = require('../models/User');
const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
    const user = await User.findById(userID);
    if (user) done(null, user);
});

passport.use(new Strategy({
    clientID: clientID,
    clientSecret: clientToken,
    callbackURL: clientRedirect,
    scope: ['identify', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ userID: profile.id });
        if (user) return done(null, user);

        const newUser = new User({
            userID: profile.id,
            username: profile.username,
            guilds: profile.guilds,
        });

        const savedUser = await newUser.save();
        done(null, savedUser);
    } catch (e) {
        console.error(e);
        return done(e, null);
    }
}));