// валидация
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

// конфиг
const DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb';
const SAULT_ROUNDS = 10;

module.exports = {
  URL_REGEX,
  DATABASE_URL,
  SAULT_ROUNDS,
};
