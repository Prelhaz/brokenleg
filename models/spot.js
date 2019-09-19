'use strict';

const mongoose = require('mongoose');
const Object = mongoose.Schema.Types.ObjectId;
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
  city: {
    type: String,
    required: true
  },
  spotType: {
    type: String,
    required: true
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
  userId: { 
    type: Object,
    required: true
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
  },
  videos: {
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
});

const Spots = mongoose.model('Spots', schema);

module.exports = Spots;

