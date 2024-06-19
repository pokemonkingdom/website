const { Router } = require('express');
const { isAuth } = require('../utils/auth');
const router = Router();

router.get('/', (req, res) => {
    const guilds = req.user ? req.user.guilds : [];
    res.render('dash', { guilds: guilds });
});

router.get('/settings', isAuth, (req, res) => {
    res.send(200);
});

module.exports = router;