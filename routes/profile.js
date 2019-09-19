'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/profile/:userId', (req, res) => {
  User.findById(req.params.userId)
    .populate("spotList")
    .then(user => {
      res.render('profile', user);
  });
});

module.exports = router;
