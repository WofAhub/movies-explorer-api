// повторение монго
const MONGO_DUBLICATE_ERROR = 11000;

// страница не найдена
const NotFoundError = require('../errors/NotFoundError');

// некорректные данные
const ValidationError = require('../errors/ValidationError');

// доступ закрыт
const ForbiddenError = require('../errors/ForbiddenError');

// повторение
const DublicateError = require('../errors/DublicateError');

module.exports = {
  MONGO_DUBLICATE_ERROR,
  NotFoundError,
  ValidationError,
  ForbiddenError,
  DublicateError,
};
