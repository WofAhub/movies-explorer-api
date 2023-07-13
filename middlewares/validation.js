// const база
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/config');

const {
  name,
  email,
  password,
  link,
  nameMovie,
  description,
  number,
  country,
  director,
  movieId,
} = require('../utils/messagesOfValidation');

// логин
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(email),
    password: Joi.string().required()
      .messages(password),
  }),
});

// регистрация
const validationRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(email),
    password: Joi.string().required()
      .messages(password),
    name: Joi.string().min(2).max(30)
      .messages(name),
  }),
});

// обновление профиля
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(name),
    email: Joi.string().required().email()
      .messages(email),
  }),
});

// создание фильма
const validationUploadMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages(country),
    director: Joi.string().required()
      .messages(director),
    duration: Joi.number().required()
      .messages(number),
    year: Joi.number().required()
      .messages(number),
    description: Joi.string().required().min(2).max(150)
      .messages(description),
    image: Joi.string().required().uri().regex(URL_REGEX)
      .messages(link),
    trailerLink: Joi.string().required().uri().regex(URL_REGEX)
      .messages(link),
    thumbnail: Joi.string().required().uri().regex(URL_REGEX)
      .messages(link),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required()
      .messages(nameMovie),
    nameEN: Joi.string().required()
      .messages(nameMovie),
  }),
});

// валидация айди фильма
const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required()
      .messages(movieId),
  }),
});

module.exports = {
  validationLogin,
  validationRegistration,
  validationUploadMovie,
  validationUpdateUser,
  validationMovieId,
};
