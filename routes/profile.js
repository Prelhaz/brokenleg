'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const routeGuardMiddleware = require('./../controllers/route-guard-middleware');


router.get('/profile/:userId', routeGuardMiddleware, (req, res) => {
  User.findById(req.params.userId)
    .populate("spotList")
    .then(user => {
      res.render('profile', user);
  });
});

module.exports = router;
