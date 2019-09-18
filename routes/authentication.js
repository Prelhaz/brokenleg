'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');


router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  User.signUp(username, email, password)
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      console.log('Signed up user', user);
      res.redirect('/user/:userId'); 
    })
    .catch(error => {
      console.log('Error during sign-up process', error);
      res.redirect('signup'); 
    });
});

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', (req, res, next) => {
  const username = req.body.username;
  const email = User.email;
  const password = req.body.password;
  User.signIn(username, email, password)
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      console.log('Signed in user', user);
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('Error during sign-in process', error);
      res.redirect('signin');
    });
});


router.post("/signout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;