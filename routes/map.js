'use strict';

const { Router } = require('express');
const router = Router();

router.get('/mapcanvas', (req, res, next) => {
    res.render('spotsarround');
});

module.exports = router;