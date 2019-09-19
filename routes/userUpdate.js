'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/update/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => { 
      res.render('userUpdate', user);
  });
});

router.post('/update/:userId', (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    email: req.body.email
  })
  .then(user => { 
  res.redirect(`/profile/${user._id}`);
  });
});

module.exports = router;
