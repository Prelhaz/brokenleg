'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => { 
      res.render('profile', user);
  });
});

module.exports = router;
