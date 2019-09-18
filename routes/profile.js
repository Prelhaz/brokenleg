'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/profile', (req, res, next) => {
  User.findById(req.params.userId)
    .then(userDetails => { 
      const data = { userDetails };
      res.render('profile', data);
  });
});

module.exports = router;
