const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const { sessionSecret, mongoURI } = require('./config');
const MongoStore = require('connect-mongo');

const app = express();
require('./strategies/discordAuth');

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(session({
    secret: sessionSecret,
    cookie: {
        maxAge: 60000 * 60 * 24,
        secure: true
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: MongoStore.create({ mongoUrl: mongoURI })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Global variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
})

// Proxy settings
app.set('trust proxy', 1);

// Routes
app.use('/', require('./routes/index.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/dash', require('./routes/dashboard.routes'));

module.exports = app;