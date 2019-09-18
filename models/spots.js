'use strict';

// User model goes here

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  adress:{
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  description: {
    type: String
  },
  pictures: {
    description: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    },
    path: {
      type: String,
      trim: true
    }
  }
  // videos: {
  // },
  // user_id: { 
  //   type: String,
  //   required: true
  // },
  // username: {
  //   type: String,
  //   required: true
  // }
}, {
  timestamps: true
});

const Spots = mongoose.model('Spots', schema);

module.exports = Spots;