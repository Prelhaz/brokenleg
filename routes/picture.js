'use strict';


const express = require('express');
const Picture = require('../models/picture');
const uploadCloud = require('../config/cloudinary');
const router = express.Router();

router.get('/picture', (req, res, next) => {
  Picture.find()
  .then((pictures) => {
    res.render('picture', { pictures });
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/picture/add', (req, res, next) => {
  res.render('picture-add');
});

router.post('/picture/add', uploadCloud.single('photo'), (req, res, next) => {
  const {title, description} = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPicture = new Picture({title, description, imgPath, imgName});
  new Picture.save()
    .then(picture => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;