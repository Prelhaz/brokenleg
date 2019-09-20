'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  title: String,
  description: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const cloudinary = require('cloudinary');

pictureSchema.virtual('resizedUrl').get(function() {
  const image = this;
  const path = image.url.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
   console.log(path);
  return cloudinary.url(path, { width: 400 });
  });

  module.exports = mongoose.model("Picture", pictureSchema);
