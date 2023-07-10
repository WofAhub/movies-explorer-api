// валидация regex
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// конфиг
const DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb';
const SAULT_ROUNDS = 10;
const PORT = 3000;

module.exports = {
  URL_REGEX,
  EMAIL_REGEX,
  DATABASE_URL,
  SAULT_ROUNDS,
  PORT,
};
