'use strict';
require('dotenv').config();

const { Router } = require('express');
const router = Router();
const Image = require('../models/image');

// File upload
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/node-file-upload-demo',
  allowedFormats: [ 'jpg', 'png' ]
  // filename: (req, file, callback) => {
  //   callback(null, file.originalname);
  // }
});

// const upload = multer({ dest: './uploads' });
const upload = multer({ storage });

//  ------ ROUTES ---------


router.get('/', (req, res, next) => {
  Image.find({})
    .limit(20)
    .sort({ createdAt: -1 })
    .exec()
    .then(images => {
      console.log(images);
      res.render('index', { images });
    })
    .catch(error => next(error));
});

router.post('/upload-file', upload.single('file'), (req, res, next) => {
  Image.create({
    description: req.body.description,
    originalName: req.file.originalname,
    extension: req.file.format,
    url: req.file.url
  })
    .then(file => {
      console.log(file);
      res.redirect('/');
    })
    .catch(error => 
        console.log("ERROR", error));
});

// const getFileExtension = fileName => {
//   const sections = fileName.split('.');
//   return sections.length > 1 ? sections[sections.length - 1] : null;
// };

module.exports = router;