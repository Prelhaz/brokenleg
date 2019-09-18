'use strict';

const cloudinary = require ('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.duqvrenlj,
  api_key: process.env.812684643165872,
  api_secret: process.env.N30VFJnhESKSJoJfDpou-Q7oAps
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'nome-da-pasta',
  allowedFormats: ['jpg', 'png'],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({storage: storage});

module.exports = uploadCloud;