// const база
const router = require('express').Router();

// const error NotFound
const NotFoundError = require('../errors/NotFoundError');

// роутер 404
router.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
