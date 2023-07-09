// const база
const mongoose = require('mongoose');
const validator = require('validator');

// схема фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (string) => {
        validator.isURL(string);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (string) => {
        validator.isURL(string);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (string) => {
        validator.isURL(string);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
