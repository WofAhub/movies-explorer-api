// const база
const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/config');

// схема фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле со страной фильма обязательное'],
  },
  director: {
    type: String,
    required: [true, 'Поле с режиссером фильма обязательное'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле с продолжительностью фильма обязательное'],
  },
  year: {
    type: Number,
    required: [true, 'Поле с годом выхода фильма обязательное'],
  },
  description: {
    type: String,
    required: [true, 'Поле с описанием фильма обязательное'],
  },
  image: {
    type: String,
    required: [true, 'Поле со ссылкой на постер фильма обязательное'],
    validate: {
      validator: (uri) => URL_REGEX.test(uri),
      message: 'Ссылка не соответвует стандарту',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле со ссылкой на трейлер фильма обязательное'],
    validate: {
      validator: (uri) => URL_REGEX.test(uri),
      message: 'Ссылка не соответвует стандарту',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле со ссылкой на превью фильма обязательное'],
    validate: {
      validator: (uri) => URL_REGEX.test(uri),
      message: 'Ссылка не соответвует стандарту',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Введите любой номер фильма в поле movieId'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле с названем фильма на русском языке обязательное'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле с названием фильма на английском языке обязательное'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
