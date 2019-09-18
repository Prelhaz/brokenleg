'use strict';

// User model goes here

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String
    // required: true,
    // unique:true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const signInStatic = require('./sign-in-static');
const signUpStatic = require('./sign-up-static');

schema.statics.signIn = signInStatic;
schema.statics.signUp = signUpStatic;

schema.statics.findByEmail = function(email) {
  const Model = this;
  return Model.findOne({ email })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const User = mongoose.model('User', schema);

module.exports = User; 