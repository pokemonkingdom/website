const { Router } = require('express');
const { isAuth } = require('../utils/auth');
const router = Router();

router.get('/', isAuth, (req, res) => {
    res.render('dash', { guilds: req.user.guilds });
});

router.get('/settings', isAuth, (req, res) => {
    res.send(200);
});

module.exports = router;