// const база
const rateLimit = require('express-rate-limit');

// лимитер
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Превышено количество запросов. Пожалуйста, повторите попытку позже',
});

module.exports = limiter;
