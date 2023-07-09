// const база
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/const');

// логин
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// регистрация
const validationRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

// обновление профиля
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

// создание фильма
const validationUploadMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required().min(2).max(150),
    image: Joi.string().required().uri().regex(URL_REGEX),
    trailerLink: Joi.string().required().uri().regex(URL_REGEX),
    thumbnail: Joi.string().required().uri().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация айди фильма
const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationLogin,
  validationRegistration,
  validationUploadMovie,
  validationUpdateUser,
  validationMovieId,
};
