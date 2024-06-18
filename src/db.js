const { connect } = require('mongoose');
const { mongoURI } = require('./config');

connect(mongoURI)
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));