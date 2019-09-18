'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/signin', (req, res, next) => {
res.render('signin');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
    });

router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password);
    console.log(email, password)
      .then(hash => {
        return User.create({
          email,
          passwordHash : hash
        });
      })
      .then(user => {
        req.session.user = {
          _iD: user._id
        },
        res.redirect('/user');
      })
      .catch(error =>{
        console.log('There was an error signup the user');
      });
});

router.get('/user', (req, res, next) =>{
  res.render('/user');
});

router.post("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/signin");
  });
});

module.exports = router;
