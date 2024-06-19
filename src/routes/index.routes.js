const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/terms', (req, res) => {
    res.render('terms');
});

router.get('/privacy', (req, res) => {
    res.render('privacy');
});

router.get('/forbidden', (req, res) => {
    res.render('forbidden');
});

module.exports = router;