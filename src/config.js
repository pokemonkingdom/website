require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    mongoURI: process.env.mongoURI || 'mongodb://localhost/website',
    sessionSecret: process.env.sessionSecret || 'secret',
    clientID: process.env.clientID,
    clientToken: process.env.clientToken,
    clientRedirect: '/auth/discord/callback',
};