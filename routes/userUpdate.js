'use strict';

const { Router } = require('express');
const router = Router();

router.get('/update', (req, res, next) => {
res.render('userUpdate')

});

module.exports = router;
